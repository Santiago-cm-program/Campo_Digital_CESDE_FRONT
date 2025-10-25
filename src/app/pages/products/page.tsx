"use client";
import { useEffect, useState } from "react";
import { getActiveProducts } from "@/lib/api_products/ProductsApi";
import { getActiveCategories } from "@/lib/api_categories/CategoriesApi";
import { Product } from "@/types/Product";
import { Categorie } from "@/types/Categorie";
import ProductList from "@/componentes/product/ProductList";
import SearchBar from "@/componentes/searchbar/SearchBar";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getActiveProducts(), getActiveCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch(() => toast.error("Error al cargar productos/categorías"));
  }, []);

  const filtered = products.filter((p) => {
    const matchesQuery = p.producto.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      !selectedCategory || p.categoryName === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 max-w-md mx-auto">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar productos..."
        />
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded ${
              !selectedCategory ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.idCategoria}
              onClick={() => setSelectedCategory(cat.categoria)}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat.categoria
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.categoria}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ProductList products={filtered} />
      ) : (
        <p className="text-gray-500">Cargando Productos...</p>
      )}
    </div>
  );
}
