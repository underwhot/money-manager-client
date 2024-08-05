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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TTransaction } from "@/types/types";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { useToast } from "./ui/use-toast";
import {
  deleteTransaction,
  getTransactionsWithPagination,
} from "@/actions/actions";
import { formatDate } from "@/helpers/date.helper";
import { formatToUSD } from "@/helpers/currency.helper";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type TransactionsTableProps = {
  transactions: TTransaction[];
  limit: number;
};

export default function TransactionsTable({
  transactions,
  limit = 3,
}: TransactionsTableProps) {
  const [data, setData] = useState<TTransaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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

  useEffect(() => {
    setIsLoading(true);
    setData(null);

    try {
      const fetchTransactionsWithPagination = async () => {
        const token = Cookies.get("token");
        if (!token) {
          toast({
            title: "No token found. Please login.",
            variant: "destructive",
          });
          return;
        }

        const data = await getTransactionsWithPagination(
          token,
          currentPage,
          limit,
        );

        setData(data);
        setIsLoading(false);
        setTotalPages(Math.ceil(transactions.length / limit));
      };

      fetchTransactionsWithPagination();
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.toString(),
        variant: "destructive",
      });
    }
  }, [currentPage, transactions]);

  return (
    <>
      {transactions.length ? (
        <>
          <Table className="mb-4">
            <TableCaption className="hidden">
              A list of your transactions.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25px] text-left">№</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[25px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <Loader />}

              {data &&
                data.map(
                  ({ id, title, amount, category, createdAt, type }, idx) => (
                    <TableRow key={id}>
                      <TableCell className="font-medium">
                        {currentPage * limit - limit + idx + 1}
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

          {transactions.length > limit && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                    onClick={
                      currentPage > 1
                        ? () => setCurrentPage(currentPage - 1)
                        : undefined
                    }
                    href="#"
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem
                    key={i + 1}
                    className={i + 1 === currentPage ? "active" : ""}
                  >
                    <PaginationLink
                      isActive={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                      href="#"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                    onClick={
                      currentPage < totalPages
                        ? () => setCurrentPage(currentPage + 1)
                        : undefined
                    }
                    href="#"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <p className="text-center">No transactions found</p>
      )}
    </>
  );
}

function Loader() {
  const rows = Array(5).fill(null);

  return (
    <>
      {rows.map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={6}>
            <Skeleton className="h-[20px] w-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
