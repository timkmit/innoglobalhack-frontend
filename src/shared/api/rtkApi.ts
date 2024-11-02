import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.162.75.128:8080/",
  }),
  endpoints: (build) => ({
	
    getAllUsers: build.query<any, void>({
      query: () => 'get_all',
    }),
  }),
});

export const { useGetAllUsersQuery } = rtkApi;
