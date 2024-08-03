"use client";

import { FaCirclePlus } from "react-icons/fa6";
import Category from "./category";
import { Button } from "./ui/button";
import CategoriesModal from "./categories-modal";
import { useAppDispatch } from "@/store/hooks";
import { setOnOpen } from "@/store/slices/dialogSlice";
import { TCategory } from "@/types/types";

type CategoriesProps = {
  categories: TCategory[];
}

export default function Categories({ categories }: CategoriesProps) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="mb-5 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => dispatch(setOnOpen("post"))}
          className="mx-auto"
          variant="link"
        >
          <FaCirclePlus size={20} className="mr-2" />
          Create new category
        </Button>
      </div>

      <CategoriesModal />
    </div>
  );
}
