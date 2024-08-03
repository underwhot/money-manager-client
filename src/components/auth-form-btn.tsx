"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
  isLogin: boolean;
};

export default function AuthFormBtn({ isLogin }: AuthFormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button className="flex-initial" type="submit" disabled={pending} >
      {isLogin ? "Login" : "Register"}
    </Button>
  );
}
