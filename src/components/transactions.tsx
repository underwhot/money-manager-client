import { cookies } from "next/headers";
import TransactionsForm from "./transactions-form";
import {
  getCategories,
  getTransactions,
  totalExpense,
  totalIncome,
} from "@/actions/actions";
import { redirect } from "next/navigation";
import TransactionsChart from "./transactions-chart";
import TransactionsTable from "./transactions-table";
import { Separator } from "@/components/ui/separator";

export default async function Transactions() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth");
  }

  const categories = await getCategories(token.value);
  const transactions = await getTransactions(token.value);
  const income = await totalIncome(token.value);
  const expense = await totalExpense(token.value);

  return (
    <div className="">
      <div className="flex gap-8">
        <div className="flex-[0_1_70%]">
          <TransactionsForm categories={categories} />
        </div>

        <div className="flex-[0_1_30%]">
          {transactions.length ? (
            <TransactionsChart totalIncome={income} totalExpense={expense} />
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Create new transaction to show in chart
            </p>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <TransactionsTable transactions={transactions} limit={5} />
    </div>
  );
}
