import { getAllProducts } from "@/lib/api_products/ProductsApi";
import AdminProductsPageClient from "./AdminProductsPageClient";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return <AdminProductsPageClient products={products} />;
}
