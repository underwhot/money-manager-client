"use client";

import { Button } from "./ui/button";
import { FaCirclePlus } from "react-icons/fa6";
import { setOnOpen } from "@/store/slices/dialogSlice";
import { useAppDispatch } from "@/store/hooks";

export default function CreateNewCategoryBtn() {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => dispatch(setOnOpen("post"))}
      className="mx-auto"
      variant="link"
      type="button"
    >
      <FaCirclePlus size={20} className="mr-2" />
      Create new category
    </Button>
  );
}
