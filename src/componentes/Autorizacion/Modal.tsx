"use client";
import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Permitir cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Portal: monta el modal sobre <body> para estar siempre encima
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose} // Cierra al hacer clic fuera
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-6 rounded-2xl shadow-2xl w-[500px] max-w-full transform transition-all duration-300 animate-fade-in flex flex-col items-center justify-center text-center"
      >
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        {/* Contenido del modal */}
        {children}
      </div>
    </div>,
    document.body
  );
}
