"use client";

import { Button } from "./ui/button";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { TCategory } from "@/types/types";
import { useAppDispatch } from "@/store/hooks";
import { setId, setOnOpen } from "@/store/slices/dialogSlice";
import Cookies from "js-cookie";
import { useToast } from "./ui/use-toast";
import { deleteCategory } from "@/actions/actions";

export default function Category({ title, id }: TCategory) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleOnClick = () => {
    dispatch(setOnOpen("patch"));
    dispatch(setId(id));
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      if (!token) {
        toast({
          title: "No token found. Please login.",
          variant: "destructive",
        });
        return;
      }

      const data = await deleteCategory(id.toString(), token);

      if (data) {
        toast({
          title: `Category deleted`,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="secondary" asChild className="overflow-hidden">
      <div className="group relative flex select-none">
        {title}
        <div className="absolute left-0 top-0 flex h-full w-full translate-y-[-100%] items-center justify-center gap-2 bg-primary transition group-hover:translate-y-[0%]">
          <button onClick={handleOnClick}>
            <FaEdit size={20} />
          </button>

          <form
            className="flex items-center justify-center"
            onSubmit={handleDelete}
          >
            <input type="hidden" value={id} />
            <button type="submit">
              <AiFillDelete size={20} />
            </button>
          </form>
        </div>
      </div>
    </Button>
  );
}
