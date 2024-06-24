"use client";
import React, { useEffect, useState } from "react";
import SelectColumns from "./select";
import Link from "next/link";
import { Member } from "@prisma/client";
import { Button, Popconfirm, message } from "antd";
import dayjs from "dayjs";
import { Pen, Trash } from "lucide-react";

interface IProps {
  data: Member[];
  onDetele: (id: number) => Promise<void>;
}
const MemberTable = ({ data = [], onDetele }: IProps) => {
  const [selectedColumns, setSelectedColumns] = useState<Array<keyof Member>>(
    []
  );

  useEffect(() => {
    const savedColumns = localStorage.getItem("selectedColumns") || "";
    setSelectedColumns(JSON.parse(savedColumns) || []);
  }, []);

  const handleColumnsChange = (columns: Array<keyof Member>) => {
    setSelectedColumns(columns);
    localStorage.setItem("selectedColumns", JSON.stringify(columns));
  };

  const handleDelete = async (id: number) => {
    try {
      await onDetele(id);
      message.success("Delete member success");
   
    } catch (error) {
      message.error("Delete member failed");
    }
  };

  return (
    <div className="flex flex-1 flex-col m-auto ">
      <div className="flex flex-row items-center justify-between">
        <h2 className="ml-12 p-2 text-4xl pb-3">Manager Member</h2>
        <Link href={"/manager/new"}>
          <Button className="bg-blue-500 mr-5 text-white font-bold   py-5">
            Create User
          </Button>
        </Link>
      </div>
      <div className="ml-5 flex ">
        <SelectColumns value={selectedColumns} onChange={handleColumnsChange} />
      </div>
      <table className="m-8  text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className=" text-center">
              ID
            </th>
            <th scope="col" className="text-center">
              NAME
            </th>
            <th scope="col" className=" text-center">
              EMAIL
            </th>
            {selectedColumns.map((column) => (
              <th scope="col" className=" text-center" key={column}>
                {column}
              </th>
            ))}
            <th scope="col" className=" text-center">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr
              className=" border-b dark:bg-gray-800 dark:border-gray-700"
              key={member.id}
            >
              <td scope="col" className=" text-center">
                {member.id}
              </td>
              <th scope="col" className=" text-center">
                {member.name}
              </th>
              <td scope="col" className=" text-center">
                {member.email}
              </td>
              {selectedColumns.map((column) => (
                <td className="px-6 py-4 break-keep text-center" key={column}>
                  {column === "dateOfBirth" ? (
                    dayjs(member[column]).format("DD/MM/YYYY")
                  ) : column === "activeRange" ? (
                    `${dayjs(member[column].split("-")[0]).format(
                      "DD/MM/YYYY"
                    )} > ${dayjs(member[column].split("-")[1]).format(
                      "DD/MM/YYYY"
                    )}`
                  ) : column === "github" || column === "linkedIn" ? (
                    <a href={member[column]} target="_blank">
                      {member[column]}
                    </a>
                  ) : (
                    member[column]
                  )}
                  {/* Đổi định dạng */}
                </td>
              ))}
              <td scope="col" className="text-center">
                <div className="flex gap-2 items-center w-full ml-2">
                  <Link href={`/manager/${member.id}`}>
                    <Pen className="text-blue-500" />
                  </Link>
                  <Popconfirm
                    title="Delete this member"
                    description="Are you sure to delete this member?"
                    onConfirm={() => handleDelete(member.id)}
                  >
                    <Trash className="text-red-500" />
                  </Popconfirm>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
