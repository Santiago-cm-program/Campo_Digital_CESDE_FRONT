"use client";
import { useState } from "react";
import ProductList from "@/componentes/product/ProductList";
import SearchBar from "@/componentes/searchbar/SearchBar";
import { Product } from "@/types/Product";

type Props = {
    products: Product[];
};

export default function ProductsPageClient({ products }: Props) {
    const [query, setQuery] = useState("");

    const filtered = products.filter((p) =>
        p.producto.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4">
            <h1 className="mb-6 text-2xl font-bold">Página de productos</h1>

            <div className="mb-6 max-w-md mx-auto">
                <SearchBar value={query} onChange={setQuery} placeholder="Buscar productos..." />
            </div>


            {filtered.length > 0 ? (
                <ProductList products={filtered} />
            ) : (
                <p className="text-gray-500">No se encontraron productos.</p>
            )}
        </div>
    );
}
