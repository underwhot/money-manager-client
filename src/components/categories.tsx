"use client";

import Category from "./category";
import { TCategory } from "@/types/types";
import CreateNewCategoryBtn from "./create-new-category-btn";

type CategoriesProps = {
  categories: TCategory[];
};

export default function Categories({ categories }: CategoriesProps) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </div>
      <div className="flex justify-center">
        <CreateNewCategoryBtn />
      </div>
    </div>
  );
}
