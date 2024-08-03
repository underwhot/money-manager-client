"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { RiUserForbidFill } from "react-icons/ri";

export default function ProtectedRouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = useAuth();

  return <>{isAuth ? children : <NotAuthorized />}</>;
}

function NotAuthorized() {
  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center gap-3">
      <RiUserForbidFill size={100} />
      <h2 className="text-2xl">Not authorized</h2>
      <Button asChild>
        <Link href="/auth">Log in</Link>
      </Button>
    </div>
  );
}
