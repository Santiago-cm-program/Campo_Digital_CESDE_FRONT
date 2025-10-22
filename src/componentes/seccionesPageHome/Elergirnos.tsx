"use client";
import { Leaf, ShieldCheck, Truck, Sprout } from "lucide-react";

export default function Elergirnos() {
  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-green-100 py-20 flex flex-col items-center justify-center px-6">
      <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">
        ¿Por qué escogernos?
      </h2>
      <p className="max-w-3xl text-center text-gray-700 text-lg mb-12">
        Somos una marca comprometida con el campo colombiano, brindando productos agrícolas de la más alta calidad, cultivados con respeto por la tierra y las personas.  
        Nuestro propósito es ofrecer soluciones sostenibles que impulsen la productividad, la salud del suelo y el bienestar de quienes trabajan en él.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
          <Leaf className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Agricultura sostenible
          </h3>
          <p className="text-gray-600 text-sm">
            Fomentamos prácticas responsables que respetan los ciclos naturales del suelo y los recursos hídricos.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
          <ShieldCheck className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Calidad garantizada
          </h3>
          <p className="text-gray-600 text-sm">
            Todos nuestros productos son evaluados bajo estrictos estándares de calidad para garantizar resultados óptimos.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
          <Truck className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Logística eficiente
          </h3>
          <p className="text-gray-600 text-sm">
            Contamos con una red de distribución ágil que garantiza entregas oportunas a cualquier región del país.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
          <Sprout className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Innovación constante
          </h3>
          <p className="text-gray-600 text-sm">
            Invertimos en investigación y tecnología para ofrecer productos más eficientes y sostenibles.
          </p>
        </div>
      </div>
    </section>
  );
}
