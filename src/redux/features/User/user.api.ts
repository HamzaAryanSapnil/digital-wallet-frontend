/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse, UserRow } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    updateUser: builder.mutation({
      query: ({ userId,payload}) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        data: payload
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
} = userApi;
