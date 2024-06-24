"use client";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface IProps {
  page: number;
  total: number;
}
const PaginationComponent = ({ page, total }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
  return (
    <Pagination
      defaultCurrent={page}
      total={total}
      onChange={(page) => {
        currentParams.set("page", String(page));
        router.push(`/manager?${currentParams.toString()}`);
      }}
      pageSize={5}
    />
  );
};

export default PaginationComponent;
