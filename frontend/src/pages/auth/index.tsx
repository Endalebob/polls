import {
  useGetUserapiQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "<@>/services/authApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useAppDispatch } from "<@>/app/hooks";
import { setUsers } from "<@>/features/authSlice";

const initialState = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password2: "",
};
const Auth = () => {
  let router = useRouter();
  const dispatch = useAppDispatch();

  const [showRegister, setshowRegister] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const { username, first_name, last_name, email, password, password2 } =
    formValue;
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const [
    loginUser,
    {
      data: loginData,
      isError: isLoginError,
      isSuccess: isLoginSuccess,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const handleLogin = async () => {
    if (username && password) {
      await loginUser({ username, password });
    } else {
      toast.error("please fill all input field");
    }
  };
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("login successeful!");
      console.log(loginData.token);
      dispatch(setUsers({ token: loginData.token }));
      router.push("/user");
    }
  }, [loginData]);


  
  const [
    registerUser,
    {
      data: registerData,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
      error: registerError,
    },
  ] = useRegisterUserMutation();



  const handleRegister = async () => {
    if (username && password && email && password2 && last_name && first_name) {
      await registerUser({
        username,
        first_name,
        last_name,
        email,
        password,
        password2,
      });
    } else {
      toast.error("please fill all input field");
    }
  };



  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Registration successeful!");
      console.log(registerData.token);
      setshowRegister(false);
    }
  }, [isRegisterSuccess]);

  return (
    <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center">
      <div
        className="flex flex-col justify-center items-center bg-black m-5 pb-8 rounded-lg scrollbar-hide overflow-y-scroll"
        style={{ maxHeight: "90vh" }}
      >
        <h1 className="mt-8 pb-4 text-center text-3xl font-bold text-green-500 uppercase">
          {showRegister ? "Register" : "Login"}
        </h1>
        <h2 className="min-w-[450px] text-slate-400 capitalize text-center">
          {showRegister
            ? "please enter user detail"
            : "please enter your email & password"}
        </h2>
        <form className=" flex flex-col space-y-4">
          <input
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={handleChange}
            className="border min-w-[350px] rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          {showRegister && (
            <>
              <input
                name="first_name"
                type="text"
                placeholder="first name"
                value={first_name}
                onChange={handleChange}
                className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
              />
              <input
                name="last_name"
                type="text"
                placeholder="last name"
                value={last_name}
                onChange={handleChange}
                className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
              />
              <input
                name="email"
                type="text"
                placeholder="email"
                value={email}
                onChange={handleChange}
                className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
              />
            </>
          )}

          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
            className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          {showRegister && (
            <>
              <input
                name="password2"
                type="password"
                placeholder="confirm password"
                value={password2}
                onChange={handleChange}
                className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
              />
            </>
          )}
          {!showRegister ? (
            <button
              type="button"
              onClick={() => handleLogin()}
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => handleRegister()}
              type="button"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Register
            </button>
          )}
          <h4>
            {!showRegister ? (
              <div className="flex flex-wrap gap-2">
                don't have an account?
                <p
                  className=" text-sky-500 font-semibold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setshowRegister(true)}
                >
                  signup
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                have an account?
                <p
                  className="text-sky-500 font-semibold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setshowRegister(false)}
                >
                  login
                </p>
              </div>
            )}
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Auth;
