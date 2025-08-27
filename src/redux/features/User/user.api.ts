/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITransaction, TransResData } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (payload) => ({
        url: `/wallets/send-money`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    withdraw: builder.mutation({
      query: (payload) => ({
        url: `/wallets/withdraw`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["TRANSACTION", "WALLET"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    getUserTransactions: builder.query<
      TransResData,
      { page: number; limit: number; type?: string; [key: string]: any }
    >({
      query: (params) => ({
        url: `/transactions/me`,
        method: "GET",
        params,
      }),
      transformResponse: (response: IResponse<ITransaction[]>) => {
        return { data: response.data, meta: response.meta! };
      },
      providesTags: ["TRANSACTION", "WALLET"],
    }),
  }),
});

export const { useUpdateUserMutation, useGetUserTransactionsQuery, useSendMoneyMutation, useWithdrawMutation } = userApi;
