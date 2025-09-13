import ProductCard from "./ProductCard";
import { Product } from "@/types/Product";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.idProducto} product={product} />
      ))}
    </div>
  );
}
