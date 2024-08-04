"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function TransactionsFormBtn() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Create transaction
    </Button>
  );
}
