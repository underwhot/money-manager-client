import Title from "@/components/title";
import ProtectedRouteProvider from "../protected-route-provider";
import Categories from "@/components/categories";
import { cookies } from "next/headers";
import { getCategories } from "@/actions/actions";
import { redirect } from "next/navigation";

export default async function CategoriesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth");
  }

  const categories = await getCategories(token.value);

  return (
    <ProtectedRouteProvider>
      <Title>Categories</Title>
      <Categories categories={categories} />
    </ProtectedRouteProvider>
  );
}
