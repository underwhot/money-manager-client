"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type CategoriesModalBtnProps = {
  formType: "post" | "patch";
};

export default function CategoriesModalBtn({
  formType,
}: CategoriesModalBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {formType === "post" ? "Create" : "Update"}
    </Button>
  );
}
