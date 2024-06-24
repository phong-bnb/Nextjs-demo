import React from "react";
import { deleteMemberById, getAllMember } from "./functions";
import MemberTable from "./table";
import { revalidatePath } from "next/cache";
import PaginationComponent from "./pagination";
import Filter from "./filter";
import Link from "next/link";
import { Button } from "antd";

interface IProps {
  searchParams: {
    page: string;
    filter: string
  };
}
const MemberList = async ({ searchParams: { page , filter} }: IProps) => {
  const data = await getAllMember(Number(page) || 1, filter);

  const onDetele = async (id: number) => {
    "use server";
    await deleteMemberById(Number(id));
    revalidatePath("/manager");
  };
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="ml-12 p-2 text-4xl pb-3">Manager Member</h2>
        <div className="flex flex-row">
          <Filter  />
          <Link href={"/manager/new"}>
            <Button className="bg-blue-500 mr-5 text-white font-bold   py-5">
              Create User
            </Button>
          </Link>
        </div>
      </div>

      <MemberTable data={data.data} onDetele={onDetele} />
      <PaginationComponent page={data.page || 1} total={data.total}  />
    </div>
  );
};

export default MemberList;
