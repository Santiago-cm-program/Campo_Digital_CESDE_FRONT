"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/lib/api_products/ProductsApi";
import { Product } from "@/types/Product";
import ProductTable from "@/componentes/product/ProductTable";
import SearchBar from "@/componentes/searchbar/SearchBar";
import { toast } from "sonner";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllProducts()
      .then(setItems)
      .catch(() => toast.error("Error al cargar productos"));
  }, []);

  const handleEdit = (product: Product) => {
    toast.info(`Editar producto: ${product.producto}`);
  };

  const handleDelete = async (id: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.idProducto === id ? { ...p, isActive: false } : p
      )
    );

    toast.success(`Producto desactivado (ID: ${id})`);

    try {
      await deleteProduct(id);
    } catch (error) {
      toast.error("Error al desactivar el producto");
      setItems((prev) =>
        prev.map((p) =>
          p.idProducto === id ? { ...p, isActive: true } : p
        )
      );
    }
  };

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
        onEdit={(product) => toast.info(`Editar producto: ${product.producto}`)}
        onDelete={async (id) => {
          try {
            await deleteProduct(id);
            setItems((prev) => prev.filter((p) => p.idProducto !== id));
            toast.success(`Producto eliminado (ID: ${id})`);
          } catch {
            toast.error("Error al eliminar el producto");
          }
        }}
      />
    </div>
  );
}
