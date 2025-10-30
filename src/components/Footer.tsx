"use cliente";


import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t-2 w-full pb-0 p-0 border-green-900 bg-green-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2 py-4">
          <Link
            href="/"
            aria-label="Ir Al Inicio"
            className="inline-flex items-center"
          ></Link>
          <nav className="flex items-center gap-6 text-sm text-neutral-700 dark:text-neutral-300">
            <Link
              href="/pages/acerca"
              className="hover:text-black dark:hover:text-white transition-colors"
              aria-label="Ir a Acerca"
            >
              Acerca de Nosostros
            </Link>
          </nav>
          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Campo Digital. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
