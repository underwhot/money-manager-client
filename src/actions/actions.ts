"use server";

import { ResponseUserData, User, UserData } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const login = async (userData: UserData) => {
  try {
    const res = await axiosInstance.post("auth/login", userData);
    return res.data as User | undefined;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to login");
  }
};

export const registration = async (userData: UserData) => {
  try {
    const res = await axiosInstance.post("/user", userData);
    return res.data as ResponseUserData | undefined;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to register");
  }
};

export const getProfile = async (token: string) => {
  const res = await axiosInstance.get("auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    return res.data as User | undefined;
  }
};

export const createCategory = async (formData: FormData, token: string) => {
  const title = formData.get("title") as string;

  try {
    const res = await axiosInstance.post(
      "/categories",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    revalidatePath("/categories");

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create category");
  }
};

export const updateCategory = async (formData: FormData, token: string) => {
  const title = formData.get("title") as string;
  const id = formData.get("id") as string;

  try {
    const res = await axiosInstance.patch(
      `/categories/category/${id}`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    revalidatePath("/categories");

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to update category");
  }
};

export const deleteCategory = async (id: string, token: string) => {
  try {
    const res = await axiosInstance.delete(`/categories/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/categories");

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to delete category");
  }
};

export const getCategories = async (token: string) => {
  try {
    const res = await axiosInstance.get("/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/categories");

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to get categories");
  }
};
