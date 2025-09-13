import { getAllProducts } from "@/lib/api_products/ProductsApi";
import ProductList from "@/componentes/product/ProductList";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Pagina de products</h1>
      <ProductList products={products} />
    </div>
  );
}

