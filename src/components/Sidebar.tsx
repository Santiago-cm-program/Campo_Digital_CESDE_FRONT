"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  LogOut,
  Package, // 👈 icono de salir
} from "lucide-react";
import NavbarLink from "../componentes/Autorizacion/NavbarLink";

export default function Sidebar() {
  const [user, setUser] = useState<any | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);

  // cargar usuario desde localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoadingUser(false);
    }
  }, []);

  // 👉 logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    setUser(null); // limpia el estado

    // Redirige al login
    window.location.href = "/";
  };

  const NavLinks = ({ showText }: { showText: boolean }) => (
    <nav className="flex flex-col gap-4 mt-6">
      <a href="/" className="flex items-center gap-2 hover:text-gray-300">
        <Home className="w-5 h-5" />
        <span className={`${showText ? "inline" : "hidden"}`}>Inicio</span>
      </a>

      <a href="/pages/products" className="flex items-center gap-2 hover:text-gray-300">
        <Package  className="w-5 h-5" />
        <span className={`${showText ? "inline" : "hidden"}`}>Productos</span>
      </a>

      {!loadingUser && !user && <NavbarLink showText={showText} />}

      {/* solo si es admin */}
      {!loadingUser && user?.rol?.descripcion === "ADMIN" && (
        <a
          href="/administrar"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <Settings className="w-5 h-5" />
          <span className={`${showText ? "inline" : "hidden"}`}>
            Administrar
          </span>
        </a>
      )}

      {/* 👇 botón de logout (solo cuando hay usuario logueado) */}
      {!loadingUser && user && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:text-gray-300 mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span className={`${showText ? "inline" : "hidden"}`}>Salir</span>
        </button>
      )}
    </nav>
  );

  return (
    <>
      {/* Sidebar Desktop */}
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

        <NavLinks showText={open} />
      </aside>

      {/* Sidebar Mobile */}
      {mobile && (
        <aside className="fixed inset-y-0 left-0 w-64 bg-green-500 text-white p-4 z-50">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">Campo Digital</h1>
            <button onClick={() => setMobile(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <NavLinks showText={true} />
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
