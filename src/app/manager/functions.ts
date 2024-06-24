import { Member } from "@prisma/client";

import { prisma } from "../../lib/prisma";

export const createMember = (data: Member) => {
  return prisma.member.create({ data: data });
};

export const getAllMember = async (page?: number, filter?: string) => {
  let data = []
  if (filter) {
    data = await prisma.$queryRawUnsafe(`SELECT * FROM member WHERE ${atob(filter)}`) as Member[]
  } else {
    data = await prisma.member.findMany({
      skip: page ? (page - 1) * 5 : 0,
      take: 5,
    });
  }

  const total = await prisma.member.count();

  return { data, total, page, limit: 5 };
};

export const getMemberById = (id: number) => {
  return prisma.member.findFirst({ where: { id } });
};

export const updateMember = (id: number, data: Member) => {
  return prisma.member.update({ where: { id }, data: data });
};

export const deleteMemberById = (id: number) => {
  return prisma.member.delete({ where: { id } });
};
