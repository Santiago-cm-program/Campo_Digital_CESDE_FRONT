"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct, updateProduct } from "@/lib/api_products/ProductsApi";
import { Product } from "@/types/Product";
import ProductTable from "@/componentes/product/ProductTable";
import SearchBar from "@/componentes/searchbar/SearchBar";
import { toast } from "sonner";
import EditProductModal from "@/components/ui/modal";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    getAllProducts()
      .then(setItems)
      .catch(() => toast.error("Error al cargar productos"));
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
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
    } catch  {
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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={async (updatedProduct) => {
            try {
              const saved = await updateProduct(updatedProduct.idProducto, updatedProduct);

              setItems((prev) =>
                prev.map((p) =>
                  p.idProducto === saved.idProducto ? saved : p
                )
              );

              toast.success("Producto actualizado correctamente");
            } catch (error) {
              toast.error("Error al actualizar el producto");
              console.error(error);
            } finally {
              setEditingProduct(null);
            }
          }}
        />
      )}

    </div>

  );
}
