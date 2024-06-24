import { Member } from "@prisma/client";
import * as React from "react";
import Select from "react-select";

export const COLUMN_NAMES: Array<keyof Member> = [
  "activeRange",
  "dateOfBirth",
  "linkedIn",
  "phoneNumber",
];

interface IProps {
  onChange: (values: Array<keyof Member>) => void;
  value: Array<keyof Member>;
}

const convertLabel = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
export default function SelectColumns({ onChange, value }: IProps) {
  return (
    <Select
      closeMenuOnSelect={false}
      value={value.map((v) => ({ value: v, label: convertLabel(v) }))}
      styles={{
        multiValueLabel: (base) => ({
          ...base,
          color: "black",
        }),
      }}
      isMulti
      onChange={(e) => onChange(e.map((i) => i.value))}
      options={COLUMN_NAMES.map((n) => ({ value: n, label: convertLabel(n) }))}
    />
  );
}
