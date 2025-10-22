"use client";
import Image from "next/image";

export default function AliadosCollage() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16">
      <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">
        Aliados más importantes
      </h2>

      {/* Contenedor de las imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-7xl px-6">
        {/* Imagen 1 */}
        <div className="relative flex items-center justify-center h-[350px] bg-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
          <Image
            src="/resources/Aliado_1.png"
            alt="Aliado 1"
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* Imagen 2 */}
        <div className="relative flex items-center justify-center h-[350px] bg-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
          <Image
            src="/resources/Aliado_2.jpeg"
            alt="Aliado 2"
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Imagen 3 */}
        <div className="relative flex items-center justify-center h-[350px] bg-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
          <Image
            src="/resources/Aliado_3.webp"
            alt="Aliado 3"
            fill
            className="object-contain p-4"
          />
        </div>
      </div>
    </section>
  );
}
