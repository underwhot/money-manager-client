"use client";

import { getTokenFormLocalStorage } from "@/helpers/localstorage.helper";
import { AuthService } from "@/services/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { login, logout } from "@/store/slices/userSlice";
import { useEffect } from "react";

export default function CheckAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFormLocalStorage();

    try {
      if (token) {
        const data = await AuthService.getProfile();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
}
