import Link from "next/link";
import React from "react";

const Navigator = () => {
  return (
    <div className="flex justify-end gap-6 mr-8 mt-2 bg-black bg-opacity-10">
      <Link
        className=" border-2 border-zinc-700 rounded-md p-1 hover:px-2 hover:border-zinc-500 hover:bg-zinc-800 hover:border-1"
        href="/"
      >
        home
      </Link>
      <Link
        className=" border-2 border-zinc-700 rounded-md p-1 hover:px-2 hover:border-zinc-500 hover:bg-zinc-800 hover:border-1"
        href="/auth"
      >
        sign in
      </Link>
      <Link
        className=" border-2 border-zinc-700 rounded-md p-1 hover:px-2 hover:border-zinc-500 hover:bg-zinc-800 hover:border-1"
        href="/user"
      >
        user
      </Link>
      <Link
        className=" border-2 border-zinc-700 rounded-md p-1 hover:px-2 hover:border-zinc-500 hover:bg-zinc-800 hover:border-1"
        href="/user/edit"
      >
        edit user
      </Link>
    </div>
  );
};

export default Navigator;
