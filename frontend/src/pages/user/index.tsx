import { useAppSelector } from "<@>/app/hooks";
import { store } from "<@>/app/store";
import { useGetUserQuery } from "<@>/services/authApi";
import User from "<@>/types/user";
import Image from "next/image";
import React from "react";

const User = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { data = [] as unknown as User, isFetching } = useGetUserQuery(token);
  if (isFetching) {
    return <h1>loading...</h1>;
  }
  if (!data.data) {
    return (
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <a
              rel="noopener noreferrer"
              href="/auth"
              className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex gap-8 m-5 w-screen">
      <Image width={300} height={300} src="/img1.jpg" alt="img"></Image>
      <div className="flex flex-col p-5 gap-6">
        <h1 className=" uppercase text-6xl font-mono text-teal-400">{`${data.data.first_name}  ${data.data.last_name}`}</h1>
        <h1 className=" text-3xl font-mono text-yellow-400">{`username: ${data.data.username}`}</h1>
      </div>
      <a
        rel="noopener noreferrer"
        href="/auth"
        className="px-8 py-3 mt-5 mr-10 font-semibold h-min rounded dark:bg-violet-400 dark:text-gray-900"
      >
        Edit Profile
      </a>
    </div>
  );
};

export default User;
