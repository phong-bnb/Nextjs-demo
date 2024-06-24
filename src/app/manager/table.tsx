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
    <div className="flex flex-1 flex-col w-full">
      <h2 className="ml-12 p-2 text-4xl pb-3">Manager Member</h2>
      <Link href={"/manager/new"}>
        <Button>Create User</Button>
      </Link>
      <div className="ml-5">
        <SelectColumns value={selectedColumns} onChange={handleColumnsChange} />
      </div>
      <table className="m-8 w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            {selectedColumns.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member) => (
            <tr
              className=" border-b dark:bg-gray-800 dark:border-gray-700"
              key={member.id}
            >
              <th scope="col">{member.id}</th>
              <th scope="col">{member.name}</th>
              <th scope="col">{member.email}</th>
              {selectedColumns.map((column) => (
                <td className="px-6 py-4 break-keep" key={column}>
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
              <td className="text-center">
                <div className="flex gap-2">
                  <Link href={`/manager/${member.id}`}>
                    <Pen />
                  </Link>
                  <Popconfirm
                    title="Delete this member"
                    description="Are you sure to delete this member?"
                    onConfirm={() => handleDelete(member.id)}
                  >
                    <Trash />
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
