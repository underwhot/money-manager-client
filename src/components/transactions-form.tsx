"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TransactionsFormBtn from "./transactions-form-btn";
import { useState } from "react";
import { TCategory } from "@/types/types";
import CreateNewCategoryBtn from "./create-new-category-btn";
import { useToast } from "./ui/use-toast";
import Cookies from "js-cookie";
import { createTransaction } from "@/actions/actions";

type TransactionsFormProps = {
  categories: TCategory[];
};

export default function TransactionsForm({
  categories,
}: TransactionsFormProps) {
  const [formValues, setFormValues] = useState({
    title: "",
    amount: "0",
    category: "",
    type: "income",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", formValues.title);
    formData.append("amount", formValues.amount);
    formData.append("category", formValues.category);
    formData.append("type", formValues.type);

    const token = Cookies.get("token");

    try {
      if (!token) {
        toast({
          title: "No token found. Please login.",
          variant: "destructive",
        });
        return;
      }

      const data = await createTransaction(formData, token);

      if (data) {
        toast({
          title: `Transaction created`,
        });
      }

      setFormValues({
        title: "",
        amount: "0",
        category: "",
        type: "income",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="title" className="mb-2 inline-block">
          Title:
        </Label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          value={formValues.title}
        />
      </div>

      <div>
        <Label htmlFor="amount" className="mb-2 inline-block">
          Amount:
        </Label>
        <Input
          id="amount"
          type="number"
          name="amount"
          placeholder="Amount"
          step="0.01"
          required
          onChange={handleChange}
          value={formValues.amount}
        />
      </div>

      <div>
        <Label htmlFor="category" className="mb-2 inline-block">
          Category:
        </Label>
        {categories.length ? (
          <Select
            name="category"
            required
            onValueChange={(value) =>
              setFormValues({ ...formValues, category: value })
            }
            value={formValues.category}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem value={String(category.id)} key={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-muted-foreground">No categories found.</p>
        )}
      </div>

      <div className="flex justify-center">
        <CreateNewCategoryBtn />
      </div>

      <div>
        <RadioGroup
          value={formValues.type}
          onValueChange={(value) =>
            setFormValues({ ...formValues, type: value })
          }
          className="flex gap-5"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income" className="cursor-pointer">
              Income
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense" className="cursor-pointer">
              Expense
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-5">
        <TransactionsFormBtn />
      </div>
    </form>
  );
}
