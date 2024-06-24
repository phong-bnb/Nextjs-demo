import React, {Fragment} from "react";
import CreateForm from "../form";
import { createMember } from "../functions";
import { Member } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { revalidatePath } from "next/cache";

const NewMember = () => {
  const create = async (data: Member) => {
    "use server";
    try {
      await createMember(data);
      revalidatePath("/manager");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Link href={"/manager"} className=" flex gap-1 pt-10"> <ArrowLeft className="w-6" />Back</Link>
      <CreateForm onSave={create} />
    </Fragment>
  );
};

export default NewMember;
