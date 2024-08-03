"use client";

import { getProfile } from "@/actions/actions";
import { useAppDispatch } from "@/store/hooks";
import { setLogin, setLogout } from "@/store/slices/userSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function CheckAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = Cookies.get("token");

    try {
      if (token) {
        const data = await getProfile(token);

        if (data) {
          dispatch(setLogin(data));
        } else {
          dispatch(setLogout());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  return <>{isLoading ? <Loader /> : children}</>;
}

function Loader() {
  return (
    <div className="flex h-screen items-center justify-center bg-background/50">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
