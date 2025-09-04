"use cliente";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t-4 border-green-900 bg-green-300">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div className="flex flex-col items-center gap-2 py-4">
      <Link href="/" aria-label="Ir Al Inicio" className="inline-flex items-center">
        <Image
          src="/resources/logo.svg"
          alt="Logo"
          width={48}
          height={48}
          priority={false}
          className="h-12 w-12 object-contain"
        />
      </Link>

      <nav className="flex items-center gap-6 text-sm text-neutral-700 dark:text-neutral-300">
        <Link
          href="/acerca"
          className="hover:text-black dark:hover:text-white transition-colors"
          aria-label="Ir a Acerca"
        >
          Acerca de Nosostros
        </Link>
      </nav>

      <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
        © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
      </p>
    </div>
  </div>
</footer>

  )
}
