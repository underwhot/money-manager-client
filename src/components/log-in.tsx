import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LogIn() {
  const isAuth = true;

  return (
    <>
      {isAuth ? (
        <Button variant="outline">Log out</Button>
      ) : (
        <Button asChild>
          <Link href={"/auth"}>Log in</Link>
        </Button>
      )}
    </>
  );
}
