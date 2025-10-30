"use client";

import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Toaster dinámico (evita errores SSR)
const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});

// Tipos de datos esperados
interface TipoCliente {
  idTipoCliente: number;
  tipoCliente: string;
}

interface TipoDocumento {
  idTipoDocumento: number;
  tipoDocumento: string;
}

interface Ciudad {
  codigoCiudad: string;
  ciudad: string;
}

interface Departamento {
  codigoDepartamento: string;
  departamento: string;
  ciudades: Ciudad[];
}

interface RegistrarProps {
  onSuccess: () => void; // función para cerrar modal
}

export default function Registrar({ onSuccess }: RegistrarProps) {
  const [loading, setLoading] = useState(false);
  const [tiposCliente, setTiposCliente] = useState<TipoCliente[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState<Ciudad[]>([]);

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

  // 🔹 Cargar datos del formulario (clientes, documentos, departamentos)
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [clientes, documentos, departamentos] = await Promise.all([
          fetch("https://campo-digital-cesde.onrender.com/v1/api/typeclient").then((r) => r.json()),
          fetch("https://campo-digital-cesde.onrender.com/v1/api/TypeDocumento").then((r) => r.json()),
          fetch("https://campo-digital-cesde.onrender.com/v1/api/Users/departamentos").then((r) => r.json()),
        ]);

        setTiposCliente(clientes);
        setTiposDocumento(documentos);
        setDepartamentos(departamentos);
      } catch (error) {
        console.error(error);
        toast.error("❌ Error al cargar los datos del formulario");
      }
    };

    cargarDatos();
  }, []);

  // 🔹 Manejo de cambios en inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Si cambia el departamento, filtrar ciudades
    if (name === "codigoDepartamento") {
      const dep = departamentos.find((d) => d.codigoDepartamento === value);
      setCiudadesFiltradas(dep?.ciudades || []);
      setForm((prev) => ({ ...prev, codigoCiudad: "" }));
    }
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!form.email || !form.password || !form.nombreCompleto || !form.codigoDepartamento || !form.fechaNacimiento) {
      toast.error("⚠️ Por favor, completa los campos obligatorios");
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

      const res = await fetch("https://campo-digital-cesde.onrender.com/v1/api/Users/POST", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al registrar el usuario");

      toast.success("✅ Usuario registrado exitosamente");

      // Limpiar formulario
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

      // Cerrar modal tras 1 segundo
      setTimeout(() => onSuccess(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("❌ No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] border border-gray-100">
      <Toaster richColors position="top-right" style={{ zIndex: 9999 }} />

      {/* Encabezado */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <UserPlus className="w-7 h-7 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Registrar Usuario</h2>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tipo Cliente */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cliente</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección / Descripción</label>
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
