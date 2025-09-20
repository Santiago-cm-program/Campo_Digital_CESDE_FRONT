"use client";
import React from "react";
import { Product } from "../../types/Product";
import Image from "next/image";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <Image
          className="object-cover w-full h-full"
          src={product.image}
          alt={`Imagen de ${product.producto}`}
          width={300}
          height={240}
          priority
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-green-600 px-2 text-center text-sm font-medium text-white">
          {product.categoryName}
        </span>
      </div>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900 font-semibold">
            {product.producto}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${product.precio}</span>
          </p>
        </div>
        <button className="flex w-full items-center justify-center rounded-md bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
