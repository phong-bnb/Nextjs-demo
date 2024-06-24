"use client"
import React, { useState } from 'react';
import clsx from "clsx";
import { useForm } from 'react-hook-form';
interface IInputt {
  name: string;
  age: number;
  country: string;
  job: string;
  email: string;
  github: string;
  phone: number;
  action: string;
}

const CreateColum = () => {
     const [loading, setLoading] = useState(false);
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm<IInputt>({
       defaultValues: {
         name: "",
         country: "",
         job: "",
         email: "",
         github: "",
         action: "",
       },
     });
    const onSubmit = (data: IInputt) => {
      console.log(data);
  };
   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return (
    <div className=" flex items-center m-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex  flex-col">
          <div className="  grid grid-cols-2 gap-6">
            <div className=" w-96 mb-5">
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
                className={clsx(
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-red dark:focus:ring-blue-500 dark:focus:border-blue-500",
                  {
                    "text-[red]": errors.name,
                  }
                )}
              />
              {errors.name && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-5">
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
                  pattern :{ value:reg , message:"Email is not valid"},
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.email && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <input
                type="text"
                maxLength={200}
                id="country"
                {...register("country", { required: "Country is required! " })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.country && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Age
              </label>
              <input
                type="number"
                maxLength={2}
                id="age"
                {...register("age", { required: "Age is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.age && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.age.message}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="job"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Job
              </label>
              <input
                type="text"
                maxLength={200}
                id="job"
                {...register("job", { required: "Job is required " })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.job && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.job.message}
                </span>
              )}
            </div>
            <div className="mb-5">
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
                {...register("github", { required: "Github is required " })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.github && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.github.message}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="number"
                maxLength={10}
                id="phone"
                {...register("phone", {
                  required: "Phone number is required ",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.phone && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="action"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CV
              </label>
              <input
                type="text"
                maxLength={200}
                id="action"
                {...register("action", { required: "Action is required " })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.action && (
                <span className="text-xs font-semibold text-[red]">
                  {errors.action.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-progress"
              )}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateColum;