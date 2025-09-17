"use client"
import { LogIn, Settings } from 'lucide-react';
import React, { useState } from 'react'
import Modal from './Modal';
import IniciarSesion from "@/components/Autorizacion/IniciarSesion";


export default function NavbarLink({ showText }: { showText: boolean }) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setLoginOpen(true)}
        className="flex items-center gap-2 hover:text-gray-300"
      >
        <LogIn className="w-5 h-5" />
       <span className={`${showText ? "inline" : "hidden"}`}>Iniciar Sesión</span>
      </button>

      <Modal isOpen={loginOpen} onClose={() => setLoginOpen(false)}>
        <IniciarSesion />
      </Modal>
    </>
  );
}
