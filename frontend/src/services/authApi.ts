import { RootState, store } from "<@>/app/store";
import Registration from "<@>/types/registration";
import User from "<@>/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "login/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (body: { username: string; password: string }) => {
          return { url: "/account/login/", method: "POST", body };
        },
      }),
      registerUser:builder.mutation({
        query:(body:Registration) => {
            return {
                url:"/account/register/",
                method:"POST",
                body
            }
        }
      }),
      logoutUser: builder.mutation({
        query: () => {
          return {
            url: "account/logout/",
            method: "POST",
          };
        },
      }),
      getUser: builder.query<User, string>({
        query: (token) => ({
          headers: {
            authorization: `token ${token}` as string,
          },
          url: "/account/user-detail/",
          method: "GET",
        }),
      }),
    };
  },
});

export const { useLoginUserMutation, useGetUserQuery, useRegisterUserMutation } = authApiSlice;
