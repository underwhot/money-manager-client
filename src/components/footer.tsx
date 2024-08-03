"use client";

import { selectUser } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

export default function Footer() {
  const user = useSelector(selectUser);

  return (
    <footer className="border-t-2">
      <div className="container py-4 text-center">
        {user ? `Logged in as ${user.email}` : "You are not logged in"}
      </div>
    </footer>
  );
}
