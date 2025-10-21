"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/Product";

export function CarouselDemo() {
  const [productos, setProductos] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/v1/products/GET/active")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  if (productos.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500">Cargando productos...</p>
      </div>
    );
  }

  return (
    <section className="w-full flex justify-center items-center bg-gray-50 py-8">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Novedades</h2>

        <Carousel className="w-full">
          <CarouselContent>
            {productos.map((prd) => (
              <CarouselItem
                key={prd.idProducto}
                className="flex justify-center items-center"
              >
                <Card className="w-full max-w-lg mx-auto shadow-md rounded-2xl overflow-hidden">
                  <CardContent className="flex flex-col justify-center items-center text-center p-6 space-y-4">
                    <img
                      src={prd.image || "/placeholder.png"}
                      alt={prd.producto}
                      className="w-full max-w-md h-80 object-contain"
                    />

                    <div>
                      <h2 className="text-xl font-semibold">{prd.producto}</h2>
                      <p className="text-gray-600 mt-2">
                        {prd.descripcion || "Sin descripción disponible"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
