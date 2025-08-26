/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITransaction, TransResData,  } from "@/types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<
      TransResData,
      { page: number; limit: number; type?: string; [key: string]: any }
    >({
      query: (params) => ({
        url: "/admin/all-transaction",
        method: "GET",
        params,
      }),
      transformResponse: (response: IResponse<ITransaction[]>) => {
        return { data: response.data, meta: response.meta! };
      },
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
