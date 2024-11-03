import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_ACCESS_TOKEN } from "@/shared/consts/localStorage";

interface Review {
  worker_id: string;
  user_feedback: string[];
}

interface AddReviewRequest {
  reviewer_id: number;
  worker_id: number;
  review_text: string;
}

interface AnalysisRequest {
  id: number;
  worker_ids: string[];
  analysis_status: string;
  analysis_result: string | null;
}

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_ACCESS_TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllUsers: build.query<any, void>({
      query: () => "get_all",
    }),
    getUserReviews: build.query<Review[], string[]>({
      query: (ids) => ({
        url: "get_review_selected",
        method: "POST",
        body: {
          worker_ids: ids,
        },
      }),
    }),
    addReview: build.mutation<void, AddReviewRequest>({
      query: (newReview) => ({
        url: "add_review",
        method: "POST",
        body: newReview,
      }),
    }),
    startAnalysis: build.mutation<{ message: string; request_id: number }, string[]>({
      query: (worker_ids) => ({
        url: "start_analysis",
        method: "POST",
        body: {
          worker_ids,
        },
      }),
    }),
    getUserSummary: build.query<string, string>({
      query: (id) => ({
        url: `get_summary_by_profile/${id}`,
        method: "GET",
      }),
    }),
    getAllAnalysisRequests: build.query<AnalysisRequest[], void>({
      query: () => ({
        url: "get_all_analysis_requests",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserReviewsQuery,
  useAddReviewMutation,
  useStartAnalysisMutation,
  useLazyGetUserSummaryQuery,
  useGetAllAnalysisRequestsQuery,
} = rtkApi;
