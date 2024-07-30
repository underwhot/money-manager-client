import { axiosInstance } from "@/api/axios.api";
import { ResponseUserData, UserData } from "@/types/types";

export const AuthService = {
  async registration(userData: UserData) {
    const { data } = await axiosInstance.post("user", userData);
    return data as ResponseUserData | undefined;
  },

  async login() {},

  async getMe() {},
};
