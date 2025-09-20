"use client";

import { useState } from "react";
import { Product } from "@/types/Product";
import ProductTable from "@/componentes/product/ProductTable";
import SearchBar from "@/componentes/searchbar/SearchBar";
import { toast } from "sonner";
import { deleteProductAction } from "@/actions/products/Products";

type Props = {
  products: Product[];
};

export default function AdminProductsPageClient({ products }: Props) {
  const [items, setItems] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (product: Product) => {
    toast.info(`Editar producto: ${product.producto}`);
    // aquí abrir modal de edición
  };

  const handleDelete = async (id: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.idProducto === id ? { ...p, isActive: false } : p
      )
    );

    toast.success(`Producto desactivado (ID: ${id})`);

    try {
      await deleteProductAction(id);
    } catch (error) {
      toast.error("Error al desactivar el producto");
      setItems((prev) =>
        prev.map((p) =>
          p.idProducto === id ? { ...p, isActive: true } : p
        )
      );
    }
  };

  // 🔍 filtramos por nombre, descripción o categoría
  const filteredItems = items.filter(
    (p) =>
      p.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Administrar productos</h1>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar producto, descripción o categoría..."
      />

      <ProductTable
        products={filteredItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
