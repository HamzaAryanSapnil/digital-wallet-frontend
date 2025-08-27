/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { ICashInResponse, ICashOutResponse, ICashPayload, IResponse } from "@/types";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    agentCashIn: builder.mutation<IResponse<ICashInResponse>, ICashPayload>({
      query: (cashInInfo) => ({
        url: "/wallets/agent/cash-in",
        method: "POST",
        data: cashInInfo,
      }),
      invalidatesTags: ["WALLET", "DASHBOARD", "TRANSACTION"],
    }),
    agentCashOut: builder.mutation<IResponse<ICashOutResponse>, ICashPayload>({
      query: (cashOutInfo) => ({
        url: "/wallets/agent/cash-out",
        method: "POST",
        data: cashOutInfo,
      }),

      invalidatesTags: ["WALLET", "TRANSACTION", "AGENT_COMMISSION", "DASHBOARD" ],
    }),
    getAgentCommission: builder.query({
      query: (params) => ({
        url: `/transactions/commissions`,
        method: "GET",
        params,
      }),

      providesTags: ["AGENT_COMMISSION"],
    }),
  }),
});

export const { useAgentCashInMutation, useAgentCashOutMutation, useGetAgentCommissionQuery } = agentApi;
