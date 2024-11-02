import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Review {
  worker_id: string;
  user_feedback: string;
}

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.162.75.128:8000/",
  }),
  endpoints: (build) => ({
    getAllUsers: build.query<any, void>({
      query: () => 'get_all',
    }),
    getUserReviews: build.query<Review[], string>({
      query: (id) => ({
        url: 'get_review_selected',
        method: 'POST',
        body: {
          worker_ids: [id],
        },
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserReviewsQuery } = rtkApi;
