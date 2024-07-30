import Link from "next/link";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Navigation from "./navigation";
import LogIn from "./log-in";

export default function Header() {
  return (
    <header className="border-b-2">
      <div className="container flex items-center gap-6 py-4">
        <div className="flex-[1_0]">
          <Link href="/" className="inline-flex">
            <RiMoneyDollarCircleFill size={40} />
          </Link>
        </div>

        <div>
          <Navigation />
        </div>

        <div className="flex-[1_0] text-right">
          <LogIn />
        </div>
      </div>
    </header>
  );
}
