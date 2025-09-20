"use client";
import { Product } from "@/types/Product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Activo</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.idProducto}>
            <TableCell>{product.idProducto}</TableCell>
            <TableCell className="font-medium">{product.producto}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {product.descripcion}
            </TableCell>
            <TableCell>${product.precio.toFixed(2)}</TableCell>
            <TableCell>{product.categoryName}</TableCell>
            <TableCell>
              {product.isActive ? (
                <span className="text-green-600 font-semibold">Activo</span>
              ) : (
                <span className="text-red-600 font-semibold">Inactivo</span>
              )}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(product.idProducto)}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
