"use client";

export default function TransactionsChart() {
  return (
    <div>
      <div className="mb-4 flex gap-3 [&>*]:flex-[1_1_auto]">
        <div className="text-center">
          <div className="mb-1">Total income</div>
          <div className="rounded-md bg-secondary p-1.5">1000$</div>
        </div>

        <div className="text-center">
          <div className="mb-1">Total expenses</div>
          <div className="rounded-md bg-secondary p-1.5">1000$</div>
        </div>
      </div>

      <div>CHART</div>
    </div>
  );
}
