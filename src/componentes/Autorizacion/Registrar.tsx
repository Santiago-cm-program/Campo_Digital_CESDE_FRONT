"use client";

import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Importamos Toaster dinámicamente para evitar problemas con SSR
const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});

interface RegistrarProps {
  onSuccess: () => void; // Función que cerrará el modal
}

export default function Registrar({ onSuccess }: RegistrarProps) {
  const [loading, setLoading] = useState(false);
  const [tiposCliente, setTiposCliente] = useState<any[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState<any[]>([]);

  const [form, setForm] = useState({
    idTipoCliente: "",
    idTipoDocumento: "",
    nombreCompleto: "",
    telefono: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    email: "",
    password: "",
    descripcion: "",
    codigoDepartamento: "",
    codigoCiudad: "",
  });

  // 🔹 Cargar datos desde las APIs
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/v1/api/typeclient").then((res) =>
        res.json()
      ),
      fetch("http://localhost:8080/v1/api/TypeDocumento").then((res) =>
        res.json()
      ),
      fetch("http://localhost:8080/v1/api/Users/departamentos").then((res) =>
        res.json()
      ),
    ])
      .then(([clientes, documentos, departamentos]) => {
        setTiposCliente(clientes);
        setTiposDocumento(documentos);
        setDepartamentos(departamentos);
      })
      .catch(() => toast.error("Error al cargar los datos del formulario ❌"));
  }, []);

  // 🔹 Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 🔸 Si cambia el departamento, filtramos las ciudades
    if (name === "codigoDepartamento") {
      const dep = departamentos.find((d) => d.codigoDepartamento === value);
      setCiudadesFiltradas(dep ? dep.ciudades : []);
      setForm((prev) => ({ ...prev, codigoCiudad: "" })); // reset ciudad
    }
  };

  // 🔹 Enviar datos a la API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.password ||
      !form.nombreCompleto ||
      !form.codigoDepartamento ||
      !form.fechaNacimiento
    ) {
      toast.error("Por favor, completa los campos obligatorios");
      return;
    }

    const payload = {
      idTipoCliente: Number(form.idTipoCliente),
      idTipoDocumento: Number(form.idTipoDocumento),
      nombreCompleto: form.nombreCompleto,
      telefono: form.telefono,
      numeroDocumento: form.numeroDocumento,
      fechaNacimiento: form.fechaNacimiento,
      email: form.email,
      password: form.password,
      idRol: 5,
      activo: true,
      direccion: {
        codigoCiudad: form.codigoCiudad,
        descripcion: form.descripcion,
      },
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/v1/api/Users/POST", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al registrar el usuario");

      toast.success("✅ Usuario registrado exitosamente");

      if (onSuccess) {
        setTimeout(() => {
          onSuccess(); // Cierra el modal después de 1s
        }, 1000);
      }
      // Reiniciar formulario
      setForm({
        idTipoCliente: "",
        idTipoDocumento: "",
        nombreCompleto: "",
        telefono: "",
        numeroDocumento: "",
        fechaNacimiento: "",
        email: "",
        password: "",
        descripcion: "",
        codigoDepartamento: "",
        codigoCiudad: "",
      });
      setCiudadesFiltradas([]);
    } catch (error) {
      console.error(error);
      toast.error("❌ No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] border border-gray-100">
      {/* Añadimos el Toaster con un z-index alto para evitar que el modal lo tape */}
      <Toaster richColors position="top-right" style={{ zIndex: 9999 }} />
      {/* Botón de prueba para verificar que el toast funciona */}
      {/* <button
        onClick={() => toast.success("✅ Toast de prueba")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Probar Toast
      </button> */}
      {/* Encabezado */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <UserPlus className="w-7 h-7 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Registrar Usuario</h2>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Tipo Cliente */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Cliente
          </label>
          <select
            name="idTipoCliente"
            value={form.idTipoCliente}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione...</option>
            {tiposCliente.map((c) => (
              <option key={c.idTipoCliente} value={c.idTipoCliente}>
                {c.tipoCliente}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo Documento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Documento
          </label>
          <select
            name="idTipoDocumento"
            value={form.idTipoDocumento}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione...</option>
            {tiposDocumento.map((d) => (
              <option key={d.idTipoDocumento} value={d.idTipoDocumento}>
                {d.tipoDocumento}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            name="nombreCompleto"
            value={form.nombreCompleto}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ej: 3001234567"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Documento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Documento
          </label>
          <input
            type="text"
            name="numeroDocumento"
            value={form.numeroDocumento}
            onChange={handleChange}
            placeholder="Ej: 123456789"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="usuario@correo.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Contraseña */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="********"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Departamento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departamento
          </label>
          <select
            name="codigoDepartamento"
            value={form.codigoDepartamento}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione...</option>
            {departamentos.map((d) => (
              <option key={d.codigoDepartamento} value={d.codigoDepartamento}>
                {d.departamento}
              </option>
            ))}
          </select>
        </div>

        {/* Ciudad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <select
            name="codigoCiudad"
            value={form.codigoCiudad}
            onChange={handleChange}
            required
            disabled={!ciudadesFiltradas.length}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Seleccione...</option>
            {ciudadesFiltradas.map((c) => (
              <option key={c.codigoCiudad} value={c.codigoCiudad}>
                {c.ciudad}
              </option>
            ))}
          </select>
        </div>

        {/* Dirección */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección / Descripción
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Ej: Finca El Porvenir, Vereda Santa Marta"
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrar Usuario"}
        </button>
      </form>
    </div>
  );
}
