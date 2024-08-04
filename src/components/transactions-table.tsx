"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TTransaction } from "@/types/types";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { useToast } from "./ui/use-toast";
import { deleteTransaction } from "@/actions/actions";
import { formatDate } from "@/helpers/date.helper";
import { formatToUSD } from "@/helpers/currency.helper";

type TransactionsTableProps = {
  transactions: TTransaction[];
};

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    const token = Cookies.get("token");
    if (!token) {
      toast({
        title: "No token found. Please login.",
        variant: "destructive",
      });
      return;
    }

    const data = await deleteTransaction(id.toString(), token);

    if (data) {
      toast({
        title: `Category deleted`,
      });
    }
    try {
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {transactions.length ? (
        <Table>
          <TableCaption>A list of your transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[20px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(
              ({ id, title, amount, category, createdAt, type }, idx) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    {transactions.length - idx}
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell
                    className={
                      type === "income" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {formatToUSD.format(amount)}
                  </TableCell>
                  <TableCell>{category?.title || "No category"}</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                  <TableCell className="flex items-center justify-center text-right">
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500"
                    >
                      <FaTrash size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">No transactions found</p>
      )}
    </>
  );
}
