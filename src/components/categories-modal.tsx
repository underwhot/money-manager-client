"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/store/hooks";
import {
  selectId,
  selectIsOpen,
  selectType,
  setOnClose,
} from "@/store/slices/dialogSlice";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { createCategory, updateCategory } from "@/actions/actions";
import { useState } from "react";
import Cookies from "js-cookie";
import { useToast } from "./ui/use-toast";
import CategoriesModalBtn from "./categories-modal-btn";

export default function CategoriesModal() {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectIsOpen);
  const formType = useSelector(selectType);
  const categoryId = useSelector(selectId);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    const token = Cookies.get("token");

    try {
      if (!token) {
        toast({
          title: "No token found. Please login.",
          variant: "destructive",
        });
        return;
      }

      const data = await createCategory(formData, token);

      if (data) {
        toast({
          title: `Category ${title} created`,
        });
      }

      dispatch(setOnClose());
      setTitle("");
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (categoryId !== null && categoryId !== undefined) {
      formData.append("id", String(categoryId));
    }

    const token = Cookies.get("token");

    try {
      if (!token) {
        toast({
          title: "No token found. Please login.",
          variant: "destructive",
        });
        return;
      }

      const data = await updateCategory(formData, token);

      if (data) {
        toast({
          title: `Category ${title} updated`,
        });
      }

      dispatch(setOnClose());
      setTitle("");
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      onOpenChange={() => dispatch(setOnClose())}
      open={isOpen}
      modal
      defaultOpen={isOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            {formType === "post" ? "Add new category:" : "Update category:"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={formType === "post" ? handleCreate : handleUpdate}
          className="flex flex-col gap-4"
        >
          <Input
            value={title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Enter category name"
          />
          <CategoriesModalBtn formType={formType} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
