"use client";
import AliadosCollage from "@/componentes/seccionesPageHome/AliadosCollage";
import { CarouselDemo } from "@/componentes/seccionesPageHome/CarouselDemo";
import Elergirnos from "@/componentes/seccionesPageHome/Elergirnos";
import React from "react";

export default function HomePage() {
  return (
    <main>
      <section
        id="novedades"
        className="flex flex-col items-center justify-center bg- p-8"
      >
        <div className="flex w-full">
          {" "}
          <CarouselDemo />{" "}
        </div>
      </section>

      <section
        id="clientes"
        className="flex flex-col items-center justify-center bg- p-8"
      >
        <div className="flex w-full">
          {" "}
          <AliadosCollage />
        </div>
      </section>

      <section
        id="ofertas"
        className="flex flex-col items-center justify-center bg- p-8"
      >
        <div className="flex w-full">
          <Elergirnos />
        </div>
      </section>
    </main>
  );
}
