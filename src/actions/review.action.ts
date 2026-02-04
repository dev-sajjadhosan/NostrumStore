"use server";

import { reviewsService } from "@/services/review.service";
import { serviceOptions } from "@/types/types";

export const getReviews = async (id: string, options?: serviceOptions) => {
  const res = await reviewsService.getReviews(id, options);
  return res;
};

export const createReview = async (payload: any) => {
  const res = await reviewsService.createReview(payload);
  return res;
};
