"use client";

import { useState } from "react";
import { ClientsDTO } from "@/types/ListaUsuario";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<ClientsDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [tipoBusqueda, setTipoBusqueda] = useState<
    "id" | "documento" | "todos"
  >("todos");
  const [mensaje, setMensaje] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_USER_URL;

  // 🔍 Buscar usuarios según tipo de búsqueda
  const buscarUsuarios = async () => {
    setLoading(true);
    setMensaje("");

    try {
      let endpoint = "";

      if (tipoBusqueda === "id") {
        // ✅ corrige la ruta correcta según Swagger
        endpoint = `${apiUrl}/v1/api/Users/GET/IdCliente/${busqueda}`;
      } else if (tipoBusqueda === "documento") {
        endpoint = `${apiUrl}/v1/api/Users/GET/Documento/${busqueda}`;
      } else {
        endpoint = `${apiUrl}/v1/api/Users/GET`;
      }

      const res = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

      const text = await res.text();
      if (!text) throw new Error("Respuesta vacía del servidor");

      const data = JSON.parse(text);

      // Normaliza el formato (puede venir un array o un único objeto)
      const usuariosArray = Array.isArray(data) ? data : [data];
      setUsuarios(usuariosArray);

      if (usuariosArray.length === 0) {
        setMensaje("No se encontraron usuarios.");
      }
    } catch (error: unknown) {
      console.error("Error al obtener usuarios:", error);
      setMensaje("Error al buscar usuarios. Verifica los datos o el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Buscar Usuarios</h1>

      {/* 🔎 Filtros de búsqueda */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <select
          className="border rounded-lg px-3 py-2"
          value={tipoBusqueda}
          onChange={(e) =>
            setTipoBusqueda(e.target.value as "id" | "documento" | "todos")
          }
        >
          <option value="todos">Todos</option>
          <option value="id">Por ID</option>
          <option value="documento">Por Documento</option>
        </select>

        {tipoBusqueda !== "todos" && (
          <Input
            type={tipoBusqueda === "id" ? "number" : "text"}
            placeholder={
              tipoBusqueda === "id"
                ? "Ingrese ID del usuario"
                : "Ingrese número de documento"
            }
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1"
          />
        )}

        <Button onClick={buscarUsuarios} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {/* 🧾 Mensaje */}
      {mensaje && <p className="mb-4 text-gray-600">{mensaje}</p>}

      {/* 📋 Tabla de resultados */}
      {usuarios.length > 0 && (
        <table className="w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Documento</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border">Activo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.idCliente} className="text-center">
                <td className="p-2 border">{u.idCliente}</td>
                <td className="p-2 border">{u.nombreCompleto}</td>
                <td className="p-2 border">{u.numeroDocumento}</td>
                <td className="p-2 border">{u.email ?? "—"}</td>
                {/* ✅ usa descripcion en lugar de nombre */}
                <td className="p-2 border">
                  {u.rol?.descripcion ?? "Sin rol"}
                </td>
                <td className="p-2 border">{u.activo ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
