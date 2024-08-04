import { cookies } from "next/headers";
import TransactionsForm from "./transactions-form";
import { getCategories, getTransactions } from "@/actions/actions";
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

  return (
    <div className="">
      <div className="flex gap-8">
        <div className="flex-[0_1_70%]">
          <TransactionsForm categories={categories} />
        </div>

        <div className="flex-[0_1_30%]">
          <TransactionsChart />
        </div>
      </div>

      <Separator className="my-8" />

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
