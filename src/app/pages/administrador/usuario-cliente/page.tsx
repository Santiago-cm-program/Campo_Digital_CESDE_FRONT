"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsuarioClientePage() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Actualizar Correo</h1>

      <form className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div>
          <Label htmlFor="correo">Correo electrónico</Label>
          <Input
            id="correo"
            type="email"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <Button type="submit" className="w-full">
          Guardar Correo
        </Button>
      </form>
    </div>
  );
}