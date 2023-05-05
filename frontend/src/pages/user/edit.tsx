import { useAppSelector } from "<@>/app/hooks";
import { useUpdateUserMutation } from "<@>/services/authApi";
import UserData from "<@>/types/userdata";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Edit = () => {
  const token = JSON.parse(localStorage.getItem("user") || "{}") || {};

  const { data } = useAppSelector((state) => state.user);
  const [formValue, setFormValue] = useState(data);
  const { username, first_name, last_name, email } = formValue;
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const [
    updateUser,
    {
      data: updateData,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const handleUpdate = async () => {
    const data:UserData = {
      username:username,
      first_name:first_name,
      last_name:last_name,
      email:email,
      token:token
    }
    await updateUser(data);
  };
  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("update successeful!");
      console.log(updateData);
      router.push("/user");
    } else {
      toast.error("update successeful!");
    }
  }, [isUpdateSuccess]);
  return (
    <div className="flex justify-center bg-gradient-to-r from-sky-500 to-indigo-500 ">
      <form className=" flex flex-col space-y-4 max-w-xl p-8 bg-black">
        <label htmlFor="username">username</label>
        <input
          name="username"
          type="text"
          placeholder={username}
          value={username}
          onChange={handleChange}
          className="border min-w-[350px] rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
        />
        <label htmlFor="first_name">first_name</label>
        <input
          name="first_name"
          type="text"
          placeholder={first_name}
          value={first_name}
          onChange={handleChange}
          className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
        />
        <label htmlFor="last_name">last_name</label>
        <input
          name="last_name"
          type="text"
          placeholder={last_name}
          value={last_name}
          onChange={handleChange}
          className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
        />
        <label htmlFor="email">email</label>

        <input
          name="email"
          type="text"
          placeholder={email}
          value={email}
          onChange={handleChange}
          className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
        />

        <button
          onClick={() => handleUpdate()}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
