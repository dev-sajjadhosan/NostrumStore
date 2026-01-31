import { env } from "@/env";
import { cookies } from "next/headers";

const api_url = env.API_URL;

// , { next: { revalidate: 10 } }

interface serviceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetBlogParams {
  isFeatured?: boolean;
  search?: string;
  page?: number | string;
  limit?: number | string;
}

interface BlogData {
  title: string;
  content: string;
  tags?: string[];
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogParams,
    options?: serviceOptions,
  ) {
    try {
      const url = new URL(`${api_url}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["blogPosts"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong on get blog post." },
      };
    }
  },
  getBlogPostById: async function (id: string) {
    try {
      const url = new URL(`${api_url}/posts/${id}`);

      const res = await fetch(url.toString());
      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Something went wrong on get blog post by id." },
      };
    }
  },
  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.error) {
        return {
          data: null,
          error: { message: data.error || "Post not created!" },
        };
      }
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went long" } };
    }
  },
};
