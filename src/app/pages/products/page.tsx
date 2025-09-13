import { getAllProducts } from "@/lib/api_products/ProductsApi";
import ProductsPageClient from "./ProductsPageClient";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return <ProductsPageClient products={products} />;
}

