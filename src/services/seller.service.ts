import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/types";
import { cookies } from "next/headers";

const api_url = env.API_URL;

const getMedicines = async (params?: PgOptionsRs, options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/seller/medicines`);
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
      cache: "no-cache",
    };

    if (options?.cache) {
      config.cache = options.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next };

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

const createMedicine = async (payload: any) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/seller/medicines`, {
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
        error: { message: data.error || "Medicine not created!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

const updateOrderStauts = async (id: string, payload: any) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/seller/orders/${id}`, {
      method: "PATCH",
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
        error: { message: data.error || "Order not updated!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

const getSellerAllOrders = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  try {
    const url = new URL(`${api_url}/seller/orders`);
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

    config.next = { ...config.next, tags: ["seller-orders"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get orders." },
    };
  }
};

const getSellerMetadata = async (
  options?: serviceOptions,
) => {
  try {
    const url = new URL(`${api_url}/seller/metadata`);
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

    config.next = { ...config.next, tags: ["seller-orders"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get seller metadata." },
    };
  }
};

export const SellerServices = { getMedicines, createMedicine,updateOrderStauts ,getSellerAllOrders,getSellerMetadata};
