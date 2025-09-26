"use client";

import { useEffect, useState } from "react";
import { ClientsDTO } from "@/types/ListaUsuario";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<ClientsDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/v1/api/Users/Get")
            .then(async (res) => {

                // si no hay contenido
                const text = await res.text();
                if (!text) {
                    throw new Error("Respuesta vacía del servidor");
                }

                return JSON.parse(text); // convertir a JSON manualmente
            })
            .then((data) => {
                setUsuarios(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener usuarios:", err);
                setLoading(false);
            });
    }, []);


    if (loading) return <p className="p-4">Cargando usuarios...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Lista de Usuarios</h1>
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
                            <td className="p-2 border">{u.email}</td>
                            <td className="p-2 border">{u.rol?.nombre}</td>
                            <td className="p-2 border">
                                {u.activo ? "✅" : "❌"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
