/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse, UserRow } from "@/types";
import type { ResData } from "@/types/userTypes";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminBlockWallet: builder.mutation({
      query: () => ({
        url: "/admin/wallets/block/688ca93784bf880443423030",
        method: "PATCH",
      }),
    }),
    adminUnBlockWallet: builder.mutation({
      query: () => ({
        url: "/admin/wallets/unblock/688ca93784bf880443423030",
        method: "PATCH",
      }),
    }),
    approveAgent: builder.mutation({
      query: () => ({
        url: "/admin/agents/approve/6889cef69bb396f0ad4f1517",
        method: "PATCH",
      }),
    }),
    suspendAgent: builder.mutation({
      query: () => ({
        url: "/admin/agents/suspend/6889cef69bb396f0ad4f1517",
        method: "PATCH",
      }),
    }),
    getAllUsers: builder.query<ResData, unknown >({
      query: (params) => ({
        url: "/admin/all-users",
        method: "GET",
        params,
      }),
      transformResponse: (response: IResponse<UserRow[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    getAllTransactions: builder.query({
      query: () => ({
        url: "/admin/all-transaction",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getAllWallets: builder.query({
      query: () => ({
        url: "/admin/all-wallets",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllTransactionsQuery,
  useGetAllWalletsQuery,
} = adminApi;
