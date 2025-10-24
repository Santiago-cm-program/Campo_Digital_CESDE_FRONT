"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Product } from "@/types/Product";

interface Props {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function EditProductModal({ product, onClose, onSave }: Props) {
  const [form, setForm] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar producto</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <Input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="URL: https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="producto">Nombre del producto</Label>
            <Input
              id="producto"
              name="producto"
              value={form.producto}
              onChange={handleChange}
              placeholder="Ej: Camisa deportiva"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Ej: Camisa de algodón 100%"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="precio">Precio</Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              step="0.01"
              value={form.precio}
              onChange={handleChange}
              placeholder="Ej: $19.000"
            />
          </div>


          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
