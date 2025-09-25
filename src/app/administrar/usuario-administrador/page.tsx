"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsuarioAdministradorPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Usuario (Administrador)</h1>

      <form className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" placeholder="Ingrese el nombre del usuario" />
        </div>

        <div>
          <Label htmlFor="apellido">Apellido</Label>
          <Input id="apellido" placeholder="Ingrese el apellido del usuario" />
        </div>

        <div>
          <Label htmlFor="rol">Rol</Label>
          <Input id="rol" placeholder="Ej: Administrador, Editor, Cliente..." />
        </div>

        <div>
          <Label htmlFor="estado">Estado</Label>
          <select
            id="estado"
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
}
