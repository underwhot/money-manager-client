"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const linksList = [
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/categories",
    label: "Categories",
  },
];

export default function Navigation() {
  const isAuth = useAuth();
  const pathname = usePathname();

  return (
    <>
      {isAuth && (
        <nav>
          <ul className="flex gap-6">
            {linksList.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${pathname === href && "text-primary"} transition`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
