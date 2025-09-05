"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true); // estado: abierto o colapsado
  const [mobile, setMobile] = useState(false); // estado: para móvil

  return (
    <>
      <aside
        className={`sticky top-0 self-start h-screen ${
          open ? "w-64" : "w-16"
        } bg-green-500 text-white p-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <h1
            className={`font-bold mb-6 transition-all ${
              open ? "text-xl" : "hidden"
            }`}
          >
            Campo Digital
          </h1>
          <button className="hidden md:block" onClick={() => setOpen(!open)}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-6">
          <a href="/" className="flex items-center gap-2 hover:text-gray-300">
            <Home className="w-5 h-5" />
            {open && <span>Inicio</span>}
          </a>
          <a
            href="/usuarios"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Users className="w-5 h-5" />
            {open && <span>Usuarios</span>}
          </a>
          <a
            href="/ajustes"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <Settings className="w-5 h-5" />
            {open && <span>Ajustes</span>}
          </a>
        </nav>
      </aside>

      {/* 👉 Sidebar en móviles (flotante con overlay) */}
      {mobile && (
        <aside className="fixed inset-y-0 left-0 w-64 bg-green-500 text-white p-4 z-50">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">Campo Digital</h1>
            <button onClick={() => setMobile(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 mt-6">
            <a href="/" className="flex items-center gap-2 hover:text-gray-300">
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </a>
            <a
              href="/usuarios"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <Users className="w-5 h-5" />
              <span>Usuarios</span>
            </a>
            <a
              href="/ajustes"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <Settings className="w-5 h-5" />
              <span>Ajustes</span>
            </a>
          </nav>
        </aside>
      )}

      {/* Botón menú solo en móviles */}
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setMobile(true)}
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}
