"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { Member } from "@prisma/client";
import { DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
const { RangePicker } = DatePicker;

interface IMemberInput extends Omit<Member, "activeRange" | "dateOfBirth"> {
  activeRange: [Dayjs | undefined, Dayjs | undefined];
  dateOfBirth: Dayjs;
}
interface IProp {
  onSave: (data: Member) => Promise<void>;
  initData?: Member;
}
const CreateForm = ({ onSave, initData }: IProp) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IMemberInput>({
    defaultValues: {
      ...initData,
      dateOfBirth: dayjs(initData?.dateOfBirth),
      activeRange: [
        dayjs(initData?.activeRange?.split("-")[0]),
        dayjs(initData?.activeRange?.split("-")[1]),
      ],
    },
  });

  const onSubmit = async (data: IMemberInput) => {
    try {
      setLoading(true);
      await onSave({
        ...data,
        activeRange: data.activeRange.join("-"),
        dateOfBirth: dayjs(data.dateOfBirth).toISOString(),
      });
      message.success(initData ? "Update member success" : "Create member success");
      router.push("/manager");
    } catch (error) {
      message.error(initData ? "Update member failed" : "Create member failed");
    } finally {
      setLoading(false);
    }
  };

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return (
    <div className=" flex items-center m-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex  flex-col">
          <div className="grid grid-cols-2 gap-6">
            <div className="w-96 mb-2 relative">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required!" })}
                className={clsx("input", {
                  "text-red-500": errors.name,
                })}
              />
              {errors.name && (
                <span className="absolute bottom-[-18px] text-xs font-semibold text-[red]">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Email is required! ",
                  pattern: { value: emailRegex, message: "Email is not valid" },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.email && (
                <span className="absolute bottom-[-18px] text-xs font-semibold text-[red]">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-2 relative flex flex-col">
              <label
                htmlFor="dateOfBirth"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date Of Birth
              </label>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "DateOfBirth is required" }}
                render={({ field: { value, onBlur, onChange } }) => (
                  <DatePicker
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    className="w-full py-2"
                    maxDate={dayjs(new Date("2000-12-31"))}
                  />
                )}
              />

              {errors.dateOfBirth && (
                <span className="absolute bottom-[-18px] text-xs font-semibold text-[red]">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="linkedIn"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                LinkedIn
              </label>
              <input
                type="text"
                maxLength={200}
                id="linkedIn"
                {...register("linkedIn", {
                  pattern: {
                    value:
                      /^https?:\/\/(?:www\.)?linkedin\.com\/(?:in\/|[a-z0-9_-]+)\/[a-z0-9_-]+$/i,
                    message: "LinkedIn link is not valid",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.linkedIn && (
                <span className="absolute bottom-[-18px] text-xs font-semibold text-[red]">
                  {errors.linkedIn.message}
                </span>
              )}
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="github"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Github
              </label>
              <input
                type="text"
                maxLength={200}
                id="github"
                {...register("github", {
                  required: "Github is required",
                  pattern: {
                    value: /^https?:\/\/(?:www\.)?github\.com\/[a-z0-9_-]/i,
                    message: "Github link is not valid",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.github && (
                <span className="absolute bottom-[-18px] text-xs font-semibold text-[red]">
                  {errors.github.message}
                </span>
              )}
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Phone number is required ",
                  minLength: {
                    value: 9,
                    message: "Phone number is min 9 character",
                  },
                  maxLength: {
                    value: 12,
                    message: "Phone number is max 12 character",
                  },
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                    message: "Phone number is not valid",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.phoneNumber && (
                <span className="absolute bottom-[-18px] text-xs font-semibold text-[red]">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="mb-2 relative  flex flex-col">
              <label
                htmlFor="activeRange"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Active range
              </label>
              <Controller
                control={control}
                name="activeRange"
                rules={{
                  required: "Active range is required ",
                }}
                render={({ field: { value, onBlur, onChange } }) => (
                  <RangePicker
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    className="w-full py-2"
                  />
                )}
              />

              {errors.activeRange && (
                <span className="absolute bottom-[-18px] text-xs font-semibold text-[red]">
                  {errors.activeRange.message}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-progress"
            )}
          >
            {initData ? "Update member" : "Create member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
