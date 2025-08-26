/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ILoginResponse,
  IRegisterResponse,
  IResponse,
} from "./../../../types/index";
import { baseApi } from "@/redux/baseApi";
import type { ILogin, IRegister } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"]
    }),
    register: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"] 
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useUserInfoQuery, useLogoutMutation } =
  authApi;
