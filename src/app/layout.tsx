import type { Metadata } from "next";
import "./globals.css";
import AppWalletProvider from "./component/appWallet";
import Link from "next/link";
import Connectbutton from "./component/connectbutton";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen grid grid-rows-[80px_1fr]">
        <AppWalletProvider>
          <header className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <p className="text-xl font-semibold text-gray-800">Nextjs Demo</p>
            </div>
            <div className="ml-auto">
              <Connectbutton />
            </div>
          </header>
          <div className="flex flex-1">
            <aside className="w-60 flex flex-col gap-10 bg-gray-100 p-4  border-r border-gray-300">
              <Link href={"/nft/create"}>
                <button className="bg-violet-500 w-52 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md py-2 text-white">
                  Tạo NFT
                </button>
              </Link>
              <Link href={"/nft/market"}>
                <button className="bg-violet-500 w-52 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md py-2 text-white">
                  Chợ NFT
                </button>
              </Link>
              <Link href={"/managerform"}>
                <button className="bg-violet-500 w-52 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md py-2 text-white">
                  Quản Lý
                </button>
              </Link>
            </aside>
            {children}
          </div>
        </AppWalletProvider>
      </body>
    </html>
  );
}
