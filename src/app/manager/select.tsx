import * as React from "react";

import Select from "react-select";

export const COLUM_NAMES = [
  "AGE",
  "COUNTRY",
  "JOB",
  "GITHUB",
  "PHONE NUMBER",
  "DATE OF BIRTH",
];

interface IProps {
  onChange: (values: string[]) => void;
}
export default function SelectColumns({ onChange }: IProps) {
  return (
    <Select
      closeMenuOnSelect={false}
      styles={{
        multiValueLabel: (base) => ({
          ...base,
          color: "black",
        }),
      }}
      isMulti
      onChange={(e) => onChange(e.map((i) => i.value))}
      options={COLUM_NAMES.map((n) => ({ value: n, label: n }))}
    />
  );
}
