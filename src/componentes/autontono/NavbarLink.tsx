"use client";
import { LogIn, UserPlus } from "lucide-react";
import React, { useState } from "react";
import Modal from "@/componentes/autontono/Modal";
import IniciarSesion from "@/componentes/autontono/IniciarSesion";
import Registrar from "@/componentes/autontono/Registrar";

export default function NavbarLink({ showText }: { showText: boolean }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      {/* Botón de Iniciar Sesión */}
      <button
        onClick={() => setLoginOpen(true)}
        className="flex items-center gap-2 hover:text-gray-300 transition"
      >
        <LogIn className="w-5 h-5" />
        <span className={`${showText ? "inline" : "hidden"}`}>
          Iniciar Sesión
        </span>
      </button>

      {/* Botón de Registro */}
      <button
        onClick={() => setRegisterOpen(true)}
        className="flex items-center gap-2 hover:text-gray-300 transition"
      >
        <UserPlus className="w-5 h-5" />
        <span className={`${showText ? "inline" : "hidden"}`}>Registrarse</span>
      </button>

      {/* Modal de Iniciar Sesión */}
      <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)}>
        <IniciarSesion />
      </Modal>

      {/* Modal de Registrar */}
      <Modal isOpen={registerOpen} onClose={() => setRegisterOpen(false)}>
        <Registrar onSuccess={() => setRegisterOpen(false)} />
      </Modal>
    </>
  );
}
