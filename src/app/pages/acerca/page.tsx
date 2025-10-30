"use client";

import { Sprout, Leaf, Sun, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full bg-gradient-to-br from-green-50 via-lime-50 to-white text-gray-800">
      {/* --- NUESTRA HISTORIA --- */}
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 gap-10">
        <div className="flex-1 space-y-5">
          <h2 className="text-4xl font-extrabold text-green-800">Nuestra Historia</h2>
          <h4 className="text-lg italic text-green-700">
            &quot;Cultivando confianza desde 2023&quot;
          </h4>
          <p className="text-gray-700 leading-relaxed">
            En <span className="font-semibold text-green-700">Campo Digital</span> comenzamos con una misión clara: ofrecer a los agricultores productos de la más alta calidad para facilitar el cultivo y el cuidado de sus terrenos. 
            <br /><br />
            Fundada en 2023, nuestra empresa nace de la pasión por la tierra y el compromiso con los agricultores locales. Hoy somos un referente en el comercio agrícola online, abarcando semillas, fertilizantes, herramientas y equipos de protección.
          </p>
        </div>

        <div className="flex-1 relative h-80 w-full rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/resources/HistoriaNosotros.jpg"
            alt="Nuestra Historia"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* --- MISIÓN --- */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 gap-10 bg-white">
        <div className="flex-1 relative h-80 w-full rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/resources/Mision.jpg"
            alt="Misión Campo Digital"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-5">
          <h2 className="text-4xl font-extrabold text-green-800">Misión</h2>
          <h4 className="text-lg italic text-green-700">
            &quot;Proveer soluciones agrícolas que promuevan el crecimiento, la sostenibilidad y el éxito&quot;
          </h4>
          <p className="text-gray-700 leading-relaxed">
            En Campo Digital, nuestra misión es ofrecer productos de calidad superior que mejoren los cultivos, optimicen recursos y promuevan prácticas sostenibles.
            <br /><br />
            Trabajamos con pasión para fortalecer la agricultura responsable y generar un impacto positivo en la comunidad agrícola.
          </p>
        </div>
      </section>

      {/* --- VISIÓN --- */}
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-16 px-6 gap-10">
        <div className="flex-1 space-y-5">
          <h2 className="text-4xl font-extrabold text-green-800">Visión</h2>
          <h4 className="text-lg italic text-green-700">
            &quot;Ser líderes en la provisión de productos agrícolas innovadores y sostenibles a nivel mundial&quot;
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Aspiramos a ser la plataforma líder en e-commerce agrícola, ofreciendo una experiencia de compra excepcional y productos que impulsen el crecimiento de nuestros clientes.
            <br /><br />
            Queremos ser el socio preferido de agricultores y amantes de la naturaleza, destacando por calidad, innovación y sostenibilidad.
          </p>
        </div>

        <div className="flex-1 relative h-80 w-full rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/resources/Vision.jpg"
            alt="Visión Campo Digital"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* --- VALORES --- */}
      <section className="max-w-7xl mx-auto py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-green-800 mb-12">Nuestros Valores</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Leaf className="h-10 w-10 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Calidad y excelencia</h3>
            <p className="text-gray-600 text-sm">
              Solo trabajamos con productos seleccionados de las mejores marcas para garantizar resultados superiores.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Sun className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Sostenibilidad</h3>
            <p className="text-gray-600 text-sm">
              Promovemos una agricultura respetuosa con el medio ambiente, protegiendo los recursos naturales.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Sprout className="h-10 w-10 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Innovación</h3>
            <p className="text-gray-600 text-sm">
              Adaptamos nuevas tecnologías agrícolas para optimizar la productividad y eficiencia de nuestros clientes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Users className="h-10 w-10 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Compromiso con el cliente</h3>
            <p className="text-gray-600 text-sm">
              Ofrecemos asesoramiento experto, atención rápida y soluciones personalizadas a cada agricultor.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1 mx-auto">
            <Leaf className="h-10 w-10 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Responsabilidad social</h3>
            <p className="text-gray-600 text-sm">
              Apoyamos comunidades agrícolas locales y contribuimos al desarrollo sostenible del sector.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
