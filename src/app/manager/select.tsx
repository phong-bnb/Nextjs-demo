import * as React from "react";
import Select from "react-select";

export const COLUMN_NAMES = [
  "AGE",
  "COUNTRY",
  "JOB",
  "GITHUB",
  "PHONE NUMBER",
    "DATE OF BIRTH",
  "CV"
];

interface IProps {
  onChange: (values: string[]) => void;
  value: string[];
}

export default function SelectColumns({ onChange, value }: IProps) {
  return (
    <Select
      closeMenuOnSelect={false}
      value={value.map((v) => ({ value: v, label: v }))}
      styles={{
        multiValueLabel: (base) => ({
          ...base,
          color: "black",
        }),
      }}
      isMulti
      onChange={(e) => onChange(e.map((i) => i.value))}
      options={COLUMN_NAMES.map((n) => ({ value: n, label: n }))}
    />
  );
}
