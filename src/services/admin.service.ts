import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/types";
import { cookies } from "next/headers";

const api_url = env.API_URL;

const getCategories = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  try {
    const url = new URL(`${api_url}/categories`);
    const cookieStore = await cookies();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value as any);
        }
      });
    }

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

    config.next = { ...config.next, tags: ["medicines"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get medicines." },
    };
  }
};

const createCategory = async (payload: any) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "Category not created!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

const deleteCategory = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "Category not delete!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

export const AdminService = { getCategories, createCategory, deleteCategory };
