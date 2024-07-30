import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <TbError404 size={100} />
      <h1 className="mb-2 text-2xl">Page Not Found</h1>
      <p className="mb-5">Could not find requested resource</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
