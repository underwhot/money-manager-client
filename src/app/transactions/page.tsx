import Transactions from "@/components/transactions";
import ProtectedRouteProvider from "../protected-route-provider";
import Title from "@/components/title";

export default function TransactionsPage() {
  return (
    <ProtectedRouteProvider>
      <Title>Transactions</Title>
      <Transactions />
    </ProtectedRouteProvider>
  );
}
