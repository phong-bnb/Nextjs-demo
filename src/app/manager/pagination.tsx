"use client";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  page: number;
  total: number;
}
const PaginationComponent = ({ page, total }: IProps) => {
  const router = useRouter()
  return (
    <Pagination
      defaultCurrent={page}
      total={total}
      onChange={(page) => router.push(`/manager?page=${page}`)}
      pageSize={5}
    />
  );
};

export default PaginationComponent;
