"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { login, registration } from "@/actions/actions";
import Cookies from "js-cookie";
import { setLogin } from "@/store/slices/userSlice";
import AuthFormBtn from "./auth-form-btn";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await registration(userData);

      if (data) {
        toast({
          title: "Account created. Please login",
        });

        setIsLogin((prev) => !prev);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await login(userData);

      if (data) {
        Cookies.set("token", data.token, { expires: 30 });
        dispatch(setLogin(data));
        toast({
          title: "Logged in",
        });

        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">{isLogin ? "Login" : "Register"}</h1>
      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
        className="flex min-w-[400px] flex-col gap-4"
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={userData.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={userData.password}
        />
        <AuthFormBtn isLogin={isLogin} />
      </form>

      <Button variant="link" onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </Button>
    </div>
  );
}
