"use client";
import React from "react";

export default function HomePage() {
  return (
    <main>     
      <section
        id="novedades"
        className="min-h-screen flex flex-col items-center justify-center bg-cyan-100 p-8">
        <h2 className="text-2xl font-bold mb-4">Novedades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow rounded-lg">Producto 1</div>
          <div className="bg-white p-4 shadow rounded-lg">Producto 2</div>
          <div className="bg-white p-4 shadow rounded-lg">Producto 3</div>
        </div>
      </section>

      <section
        id="clientes"
        className="min-h-screen flex flex-col items-center justify-center bg-cyan-200 p-8">
        <h2 className="text-2xl font-bold mb-4">Clientes</h2>
        <p className="text-center max-w-xl">
          Testimonios, logos de aliados o formulario de registro.
        </p>
      </section>      
      
      <section
        id="ofertas"
        className="min-h-screen flex flex-col items-center justify-center bg-cyan-300 p-8">
        <h2 className="text-2xl font-bold mb-4">Ofertas Especiales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow rounded-lg">Oferta 1</div>
          <div className="bg-white p-6 shadow rounded-lg">Oferta 2</div>
        </div>
      </section>
    </main>
  );
}