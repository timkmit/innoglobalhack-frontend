import { lazy } from "react";

export const LazyReviewPage = lazy(async () => await import("./ReviewPage"));
