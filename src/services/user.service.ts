import { env } from "@/env";
import { PgOptionsRs, serviceOptions } from "@/types/types";
import { cookies } from "next/headers";

const auth_url = env.AUTH_URL;
const api_url = env.API_URL;

const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${auth_url}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    const session = await res.json();

    if (session === null) {
      return { data: null, error: { message: "Session is missing!" } };
    }

    return { data: session, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};
const updateUserRole = async ({ role, data }: { role: string; data: any }) => {
  try {
    const cookieStore = await cookies();
    const roleData = {
      role,
    };
    const res = await fetch(`${api_url}/profile/role/${data?.user?.id}`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    });
    return await res.json();
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};
const updateUser = async ({ data }: { role: string; data: any }) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${api_url}/profile/me`, {
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

const getProfile = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${api_url}/profile`, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (err) {
    return { data: null, error: { message: "Something Went Wrong!" } };
  }
};

const updateProfile = async (data: any) => {
  try {
    console.log(data);
    const cookieStore = await cookies();
    const res = await fetch(`${api_url}/profile/update`, {
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
const getAllMedicines = async (
  params?: PgOptionsRs,
  options?: serviceOptions,
) => {
  try {
    const url = new URL(`${api_url}/medicines`);
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

const getAllOrders = async (params?: PgOptionsRs, options?: serviceOptions) => {
  try {
    const url = new URL(`${api_url}/orders`);
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

    config.next = { ...config.next, tags: ["customer-orders"] };

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

const createOrder = async (payload: any) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/orders`, {
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
        error: { message: data.error || "orders not created!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

const deleteOrder = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        status: "CANCELLED",
      }),
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
const singleOrderData = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();

    if (data.error) {
      return {
        data: null,
        error: { message: data.error || "single order error!" },
        details: data,
      };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: { message: "Something went long" } };
  }
};

const getAllReviewByMedicineId = async (
  id?: string,
  options?: serviceOptions,
) => {
  try {
    const url = new URL(`${api_url}/review/${id}`);
    const cookieStore = await cookies();

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

    config.next = { ...config.next, tags: ["medicine-reviews"] };

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Something went wrong on get review." },
    };
  }
};

export const userService = {
  getSession,
  updateUserRole,
  updateUser,
  getAllMedicines,
  createOrder,
  getAllOrders,
  singleOrderData,
  deleteOrder,
  getAllReviewByMedicineId,
  updateProfile,
  getProfile,
};
