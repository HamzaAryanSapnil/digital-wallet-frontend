/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<
      {
        walletBalance: number;
        totals: {
          cashIn: number;
          cashOut: number;
          commission: number;
          fee: number;
          txCount: number;
          pendingCount: number;
        };
        recent: any[];
        timeseries: {
          date: string;
          transactions: number;
          volume: number;
        }[];
        topCounterparties: {
          userId: string | null;
          name: string | null;
          email: string | null;
          totalAmount: number;
          txCount: number;
        }[];
      },
      void
    >({
      query: () => ({
        url: "/user/overview",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),
  }),
});

export const { useGetDashboardOverviewQuery } = dashboardApi;
