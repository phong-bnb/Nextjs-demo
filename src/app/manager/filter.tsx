"use client";
import { Button, DatePicker, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import dayjs from "dayjs";
import { FilterIcon, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

const Columns: DefaultOptionType[] = [
  {
    value: "id",
    label: "Id",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "dateOfBirth",
    label: "Date of Birth",
  },
];

const ConditionOptions: DefaultOptionType[] = [
  {
    value: "=",
    label: "Equal",
  },
  {
    value: "<>",
    label: "Not Equal",
  },
  {
    value: ">",
    label: "Greater than",
  },
  {
    value: "<",
    label: "Less than",
  },
  {
    value: "LIKE",
    label: "Contains",
  },
];
interface IFilter {
  column: string;
  condition: string;
  value: string;
  id: number;
}

const initFilter = {
  column: "",
  condition: "=",
  value: "",
};
const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

  const [filters, setFilters] = useState([
    { ...initFilter, id: new Date().getTime() },
  ]);

  const onChangeFilter = useCallback(
    (id: number, filter: IFilter) => {
      const newFilters = filters.map((f) => {
        if (f.id === id) {
          return filter;
        }
        return f;
      });
      setFilters(newFilters);
    },
    [filters]
  );

  const onDeleteFilter = (id: number) => {
    setFilters((pre) => pre.filter((f) => f.id !== id));
  };

  const onFilter = () => {
    const filterHasValue = filters.filter(
      (f) => f.value && f.column && f.condition
    );
    if (filterHasValue.length) {
      const str = filters
        .map(
          (f) =>
            `${f.column} ${f.condition} "${
              f.condition === "LIKE" ? `%${f.value}%` : f.value
            }"`
        )
        .join(" OR ");
      currentParams.set("filter", btoa(str));
    } else {
      currentParams.delete("filter");
    }

    router.push(`/manager?${currentParams.toString()}`);
  };
  return (
    <form>
      <h4>Show Member With</h4>
      {filters.map((filter) => (
        <div
          key={filter.id}
          className="flex items-center gap-2 relative overflow-visible"
        >
          <div className="w-60 mb-2 relative">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Column
            </label>
            <Select
              value={filter.column}
              className="w-full h-10"
              options={Columns}
              onChange={(e) =>
                onChangeFilter(filter.id, {
                  ...filter,
                  column: e,
                })
              }
            />
          </div>
          <div className="w-40 mb-2 relative">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Condition
            </label>
            <Select
              value={filter.condition}
              className="w-full h-10"
              options={ConditionOptions}
              onChange={(e) =>
                onChangeFilter(filter.id, {
                  ...filter,
                  condition: e,
                })
              }
            />
          </div>
          <div className="w-60 mb-2 relative">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Value
            </label>
            {filter.column === "dateOfBirth" ? (
              <DatePicker
                value={filter.value ? dayjs(filter.value) : undefined}
                onChange={(e) =>
                  onChangeFilter(filter.id, {
                    ...filter,
                    value: dayjs(e).toISOString(),
                  })
                }
              />
            ) : (
              <input
                value={filter.value}
                type="text"
                id="name"
                className="input"
                onChange={(e) =>
                  onChangeFilter(filter.id, {
                    ...filter,
                    value: e.target.value,
                  })
                }
              />
            )}
          </div>
          {filters.length > 1 && (
            <button
              className="absolute top-9 right-[-24px]"
              onClick={() => onDeleteFilter(filter.id)}
            >
              <Trash className="w-5" />
            </button>
          )}
        </div>
      ))}
      <div className="flex gap-2 my-2">
        <Button
          className="flex gap-1"
          onClick={() =>
            setFilters((pre) =>
              pre.concat({ ...initFilter, id: new Date().getTime() })
            )
          }
        >
          <Plus className="w-4" />
          Add
        </Button>
        <Button
          className="flex gap-1"
          onClick={() => {
            setFilters([{ ...initFilter, id: new Date().getTime() }]);
            onFilter();
          }}
        >
          Clear
        </Button>
      </div>

      <Button type="primary" onClick={onFilter}>
        <FilterIcon className="w-4" />
        Filter
      </Button>
    </form>
  );
};

export default Filter;
