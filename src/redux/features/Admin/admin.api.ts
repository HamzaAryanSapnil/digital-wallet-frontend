/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse,  UserRow } from "@/types";
import type { ResData } from "@/types/userTypes";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    approveAgent: builder.mutation({
      query: (userId) => ({
        url: `/admin/agents/approve/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    suspendAgent: builder.mutation({
      query: (userId) => ({
        url: `/admin/agents/suspend/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/block/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    getAllUsers: builder.query<ResData, unknown>({
      query: (params) => ({
        url: "/admin/all-users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
      transformResponse: (response: IResponse<UserRow[]>) => {
        return { data: response.data, meta: response.meta! };
      },
    }),
   
    
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} = adminApi;
