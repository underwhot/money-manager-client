"use client";

import { formatToUSD } from "@/helpers/currency.helper";
import Chart from "./chart";

type TransactionsChartProps = {
  totalIncome: number;
  totalExpense: number;
};

export default function TransactionsChart({
  totalIncome,
  totalExpense,
}: TransactionsChartProps) {
  return (
    <div>
      {/* <div className="mb-4 flex gap-3 [&>*]:flex-[1_1_auto]">
        <div className="text-center">
          <div className="mb-1">Total income</div>
          <div className="rounded-md bg-secondary p-1.5">
            {formatToUSD.format(totalIncome)}
          </div>
        </div>

        <div className="text-center">
          <div className="mb-1">Total expense</div>
          <div className="rounded-md bg-secondary p-1.5">
            {formatToUSD.format(totalExpense)}
          </div>
        </div>
      </div> */}

      <Chart income={totalIncome} expense={totalExpense} />
    </div>
  );
}
