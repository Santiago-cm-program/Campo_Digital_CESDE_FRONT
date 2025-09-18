import { getActiveProducts } from "@/lib/api_products/ProductsApi";
import ProductsPageClient from "./ProductsPageClient";
import { getActiveCategories } from "@/lib/api_categories/CategoriesApi";

export default async function ProductsPage() {
  const products = await getActiveProducts();
  const categories = await getActiveCategories();

  return <ProductsPageClient products={products} categories={categories} />;
}

