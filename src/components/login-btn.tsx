"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { setLogout } from "@/store/slices/userSlice";

export default function LoginBtn() {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(setLogout());
    Cookies.remove("token");

    toast({
      title: "Logged out",
    });

    router.push("/");
  };

  return (
    <>
      {isAuth ? (
        <Button onClick={handleLogout} variant="outline">
          Log out
        </Button>
      ) : (
        <Button asChild>
          <Link href={"/auth"}>Log in</Link>
        </Button>
      )}
    </>
  );
}
