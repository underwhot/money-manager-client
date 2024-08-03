import axios from "axios";
import { getTokenFormLocalStorage } from "@/helpers/localstorage.helper";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: "Bearer " + getTokenFormLocalStorage() || "",
    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhcnRwZXRyb3Zza3lpQGdtYWlsLmNvbSIsImlhdCI6MTcyMjYyMTg5MiwiZXhwIjoxNzI1MjEzODkyfQ.2BAEtespIDeWfUanyBjC3guMi3A3UyBmwX5wAuku0Xs",
  },
});
