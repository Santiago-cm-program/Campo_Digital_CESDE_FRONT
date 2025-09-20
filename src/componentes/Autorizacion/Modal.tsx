"use client";
import React, { ReactNode, useEffect } from "react";

interface ModalProps  {
    isOpen: boolean;
    onClose : () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="
          bg-white p-6 rounded-lg shadow-lg relative w-[400px]
          transform transition-all duration-300 ease-out
          opacity-100 scale-100
          animate-fade-in
        "
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
  
}
