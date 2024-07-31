"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";
import { removeTokenFromLocalStorage } from "@/helpers/localstorage.helper";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    removeTokenFromLocalStorage();
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
