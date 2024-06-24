import React from "react";
import { prisma } from "../../../lib/prisma";
import { CircleDollarSign, ShoppingCart, Star, Truck } from "lucide-react";
const getAllNFT = () => {
  return prisma.nFT.findMany();
};

const NFTList = async () => {
  const data = await getAllNFT();
  return (
    <div className="w-full flex flex-col p-8">
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((nft) => (
          <div
            key={nft.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="h-56 w-full">
              <img className="mx-auto h-full" src={nft.image} alt="" />
            </div>
            <div className="pt-6">
              <a
                href="#"
                className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
              >
                {nft.title}
              </a>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  0.0
                </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  (455)
                </p>
              </div>
              <span>{nft.description?.slice(0, 40)}</span>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
                  2 SOL
                </p>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Buy NFT
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTList;
