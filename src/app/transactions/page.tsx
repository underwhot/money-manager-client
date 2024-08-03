import ProtectedRouteProvider from "../protected-route-provider";

export default function TransactionsPage() {
  return (
    <ProtectedRouteProvider>
      <div>TransactionsPage</div>
    </ProtectedRouteProvider>
  );
}
