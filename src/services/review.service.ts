import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/types";
import { cookies } from "next/headers";

const api_url = env.API_URL;

const getReviews = async (id: string, options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/review/${id}`);
    const cookieStore = await cookies();

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",

        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    };

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next, tags: ["review"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get reviews." },
    };
  }
};
const createReview = async ({ data }: { data: any }) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${api_url}/review`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};

export const reviewsService = { getReviews, createReview };
