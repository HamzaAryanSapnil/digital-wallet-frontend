/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { ICashInResponse, ICashOutResponse, IResponse } from "@/types";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    agentCashIn: builder.mutation<IResponse<ICashInResponse>, unknown>({
      query: (cashInInfo) => ({
        url: "/wallets/agent/cash-in",
        method: "POST",
        data: cashInInfo,
      }),
      invalidatesTags: ["WALLET"],
    }),
    agentCashOut: builder.mutation<IResponse<ICashOutResponse>, unknown>({
      query: (cashOutInfo) => ({
        url: "/wallets/agent/cash-out",
        method: "POST",
        data: cashOutInfo,
      }),
      invalidatesTags: ["WALLET"],
    }),
  }),
});

export const { useAgentCashInMutation, useAgentCashOutMutation } = agentApi;
