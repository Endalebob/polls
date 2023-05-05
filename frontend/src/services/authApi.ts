import Login from "<@>/types/login";
import Registration from "<@>/types/registration";
import User from "<@>/types/user";
import UserData from "<@>/types/userdata";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Token {
  token: string;
}

export const authApiSlice = createApi({
  reducerPath: "login/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (body: Login) => {
          return { url: "/account/login/", method: "POST", body };
        },
      }),

      registerUser: builder.mutation({
        query: (body: Registration) => {
          return {
            url: "/account/register/",
            method: "POST",
            body,
          };
        },
      }),

      updateUser: builder.mutation({
        query: ({ token, ...patch }) => ({
          headers: {
            authorization: `token ${token.token}` as string,
          },
          url: "/account/user-detail/",
          method: "PATCH",
          body: patch,
        }),
      }),

      logoutUser: builder.mutation({
        query: () => {
          return {
            url: "account/logout/",
            method: "POST",
          };
        },
      }),

      getUserapi: builder.query<User, Token>({
        query: (token) => ({
          headers: {
            authorization: `token ${token.token}` as string,
          },
          url: "/account/user-detail/",
          method: "GET",
        }),
      }),
      deleteUser: builder.mutation({
        query: (token) => ({
          headers: {
            authorization: `token ${token.token}` as string,
          },
          url: "account/user-detail/",
          method: "DELETE",
        }),
      }),
    };
  },
});

export const {
  useLoginUserMutation,
  useGetUserapiQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApiSlice;
