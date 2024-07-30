"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };


  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await AuthService.registration(form);
      if (data) {
        toast({
          title: "Account created",
        });

        setIsLogin((prev) => !prev);
      }
    } catch (error: any) {
      console.error(error);
      const err = error.response?.data.message;
      toast({
        title: err.toString(),
        variant: "destructive",
      });
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {};

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
          value={form.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
        />
        <Button className="flex-initial" type="submit">
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>

      <div>
        {isLogin ? (
          <Button variant="link" onClick={() => setIsLogin((prev) => !prev)}>
            Don't have an account?
          </Button>
        ) : (
          <Button variant="link" onClick={() => setIsLogin((prev) => !prev)}>
            Already have an account?
          </Button>
        )}
      </div>
    </div>
  );
}
