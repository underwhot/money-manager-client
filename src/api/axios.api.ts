import { getTokenFormLocalStorage } from "@/helpers/localstorage.helper";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: "Bearer " + getTokenFormLocalStorage() || "",
  },
});
