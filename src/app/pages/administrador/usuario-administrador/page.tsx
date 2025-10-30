"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsuarioAdministradorPage() {
  const [form, setForm] = useState({
    id: "", // id del usuario a editar
    nombreCompleto: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    telefono: "",
    contrasena: "",
    email: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = `${apiUrl}/v1/api/Users/PUT/${form.id}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // para enviar sesión o cookies si aplica
        body: JSON.stringify({
          nombreCompleto: form.nombreCompleto,
          numeroDocumento: form.numeroDocumento,
          fechaNacimiento: form.fechaNacimiento,
          telefono: form.telefono,
          contrasena: form.contrasena,
          email: form.email,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      setMensaje("✅ Usuario actualizado correctamente");
      setForm({
        id: "",
        nombreCompleto: "",
        numeroDocumento: "",
        fechaNacimiento: "",
        telefono: "",
        contrasena: "",
        email: "",
      });
    } catch (err: unknown) {
      console.error(err);
      setMensaje(`❌ ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Usuario (Administrador)</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-lg p-6"
      >
        <div>
          <Label htmlFor="id">ID del Usuario</Label>
          <Input
            id="id"
            type="number"
            placeholder="Ingrese el ID del usuario a modificar"
            value={form.id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="nombreCompleto">Nombre Completo</Label>
          <Input
            id="nombreCompleto"
            placeholder="Ingrese el nombre completo"
            value={form.nombreCompleto}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="numeroDocumento">Número de Documento</Label>
          <Input
            id="numeroDocumento"
            placeholder="Ingrese el documento"
            value={form.numeroDocumento}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
          <Input
            id="fechaNacimiento"
            type="date"
            value={form.fechaNacimiento}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            placeholder="Ingrese el teléfono"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ingrese el correo"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="contrasena">Contraseña</Label>
          <Input
            id="contrasena"
            type="password"
            placeholder="Ingrese la nueva contraseña"
            value={form.contrasena}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </form>

      {mensaje && (
        <p
          className={`mt-4 text-center font-medium ${
            mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
}
