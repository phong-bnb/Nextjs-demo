import React from "react";
import { getMemberById, updateMember } from "../functions";
import CreateForm from "../form";
import { Member } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface IProps {
  params: {
    id: string;
  };
}
const EditPage = async ({ params: { id } }: IProps) => {
  const data = await getMemberById(Number(id));

  const onEdit = async (data: Member) => {
    "use server";
     await updateMember(Number(id), data);
     revalidatePath("/manager");
  };

  return (
    <div>
      EditPage
      {!!data && <CreateForm onSave={onEdit} initData={data} />}
    </div>
  );
};

export default EditPage;
