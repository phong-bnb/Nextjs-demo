"use client";
import React, { useState } from "react";
import SelectColumns from "./select";
import Link from "next/link";

const Page = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(() => {
    try {
      const savedColumns = localStorage.getItem("selectedColumns");
      return savedColumns ? JSON.parse(savedColumns) : [];
    } catch (e) {
      console.error("Error parsing saved columns from localStorage:", e);
      return [];
    }
  });

  const handleColumnsChange = (columns: string[]) => {
    setSelectedColumns(columns);
    localStorage.setItem("selectedColumns", JSON.stringify(columns));
  };

  return (
    <div className="flex flex-col w-full">
          <h2 className="ml-12 p-2 text-4xl pb-3"> Resource Manager </h2>
          <Link href={'/createColum'}> <button>Create Colum</button></Link>
      <div className="w-[30%] ml-5">
        <SelectColumns value={selectedColumns} onChange={handleColumnsChange} />
      </div>
      <table className="m-8 w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              NAME
            </th>
            <th scope="col" className="px-6 py-3">
              EMAIL
            </th>
            {selectedColumns.map((column) => (
              <th scope="col" className="px-6 py-3" key={column}>
                {column}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">Apple MacBook Pro</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Black
            </th>
            <td className="px-6 py-4">Accessories</td>
            {selectedColumns.map((column) => (
              <td className="px-6 py-4" key={column}>
                $99
              </td>
            ))}
          </tr>
          <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">Microsoft Surface Pro</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Black
            </th>
            <td className="px-6 py-4">Accessories</td>
            {selectedColumns.map((column) => (
              <td className="px-6 py-4" key={column}>
                $99
              </td>
            ))}
          </tr>
          <tr className=" dark:bg-gray-800">
            <td className="px-6 py-4">Magic Mouse 2</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Black
            </th>
            <td className="px-6 py-4">Accessories</td>
            {selectedColumns.map((column) => (
              <td className="px-6 py-4" key={column}>
                $99
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Page;
