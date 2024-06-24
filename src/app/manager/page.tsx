import React from "react";
import { deleteMemberById, getAllMember } from "./functions";
import MemberTable from "./table";
import { revalidatePath } from "next/cache";
import PaginationComponent from "./pagination";

interface IProps {
  searchParams: {
    page: string;
  };
}
const MemberList = async ({ searchParams: { page } }: IProps) => {
  const data = await getAllMember(Number(page) || 1);

  const onDetele = async (id: number) => {
    "use server";
    await deleteMemberById(Number(id));
    revalidatePath("/manager");
  };
  return (
    <div>
      <MemberTable data={data.data} onDetele={onDetele} />
      <PaginationComponent page={data.page || 1} total={data.total} />
    </div>
  );
};

export default MemberList;
