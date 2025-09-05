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
  const [open, setOpen] = useState(true); // 👈 estado: abierto o colapsado
  const [mobile, setMobile] = useState(false); // 👈 estado: para móvil

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 ${open ? "w-64" : "w-16"}  
  bg-green-400 text-white p-4 transform  
  ${mobile ? "translate-x-0" : "-translate-x-full"}   
  transition-all duration-300 md:relative md:translate-x-0 pt-5`}
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
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setMobile(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </aside>

      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setMobile(true)}
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}
