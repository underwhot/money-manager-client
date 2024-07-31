import { axiosInstance } from "@/api/axios.api";
import { ResponseUserData, User, UserData } from "@/types/types";

export const AuthService = {
  async registration(userData: UserData) {
    const { data } = await axiosInstance.post("user", userData);
    return data as ResponseUserData | undefined;
  },

  async login(userData: UserData) {
    const { data } = await axiosInstance.post("auth/login", userData);
    return data as User | undefined;
  },

  async getProfile() {
    const { data } = await axiosInstance.get("auth/profile");
    if (data) {
      return data as User | undefined;
    }
  },
};
