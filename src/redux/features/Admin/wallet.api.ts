/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse, IWallet, ResWalletData } from "@/types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminBlockWallet: builder.mutation({
      query: (walletId) => ({
        url: `/admin/wallets/block/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET"],
    }),
    adminUnBlockWallet: builder.mutation({
      query: (walletId) => ({
        url: `/admin/wallets/unblock/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["WALLET"],
    }),
    getAllWallets: builder.query<ResWalletData, unknown>({
      query: (params) => ({
        url: "/admin/all-wallets",
        method: "GET",
        params,
      }),
      providesTags: ["WALLET"],
      transformResponse: (response: IResponse<IWallet[]>) => {
        return { data: response.data, meta: response.meta! };
      },
    }),
  }),
});

export const {
  useAdminBlockWalletMutation,
  useAdminUnBlockWalletMutation,
  useGetAllWalletsQuery,
} = walletApi;
