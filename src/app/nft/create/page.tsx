"use client";
import clsx from "clsx";
import { CloudUpload } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SaveNft } from "./action";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  toMetaplexFileFromBrowser,
  Metaplex,
  MetaplexFile,
  walletAdapterIdentity,
  irysStorage,
} from "@metaplex-foundation/js";
import { useRouter } from "next/navigation";
interface IInput {
  name: string;
  description: string;
  image: FileList | null;
  price: number;
}
const CreateNft = () => {
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInput>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageField = register("image", { required: true });
  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(
      irysStorage({
        address: "https://devnet.irys.xyz",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 120000,
      })
    );

  const onMintNft = async ({ image, name, description, price }: IInput) => {
    const img = image?.item(0);
    if (img) {
      setLoading(true);
      try {
        const file: MetaplexFile = await toMetaplexFileFromBrowser(img);
        const { uri, metadata } = await metaplex.nfts().uploadMetadata({
          name: name,
          description,
          properties: {
            creators: [{ address: wallet.publicKey?.toString() }],
          },
          image: file,
        });
        const { nft } = await metaplex.nfts().create({
          uri: uri,
          name,
          sellerFeeBasisPoints: 1, // Represents 5.00%.
        });
        await SaveNft({
          author: nft.creators[0].address.toString(),
          image: nft.json?.image || "",
          tokenAddress: nft.address.toString(),
          uri: nft.uri,
        });
        router.push("/nft/market");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center bg-white">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Mint new NFT
      </h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onMintNft)}>
        <div className="flex flex-row gap-8">
          <div className="w-96 flex flex-col gap-5">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                maxLength={15}
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
                className={clsx(
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  {
                    "border-pink-600": errors.name?.message,
                  }
                )}
              />
              {errors.name?.message && (
                <i className="text-xs font-semibold text-red-300">
                  {errors.name?.message}
                </i>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                {...register("price", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="descriptions"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descriptions
              </label>
              <input
                type="text"
                maxLength={200}
                id="descriptions"
                {...register("description", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-progress"
              )}
            >
              Submit
            </button>
          </div>
          <div className="w-96">
            <div className="mb-5">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className={clsx(
                    "flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",
                    { "border-red-300": false }
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="w-10 h-10 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    {...imageField}
                    multiple={false}
                    onChange={(e) => {
                      imageField.onChange(e);
                      handleImageChange(e);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              {imageSrc && (
                <div className="mt-4">
                  <img
                    src={imageSrc}
                    alt="Uploaded"
                    className="max-w-full h-auto"
                  />
                </div>
              )}
              {!imageSrc && (
                <div
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="sosimage"
                >
                  Hãy tải ảnh lên
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNft;
