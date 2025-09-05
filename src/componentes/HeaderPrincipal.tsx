"use client";
import React from "react";

export default function HeaderPrincipal() {
  console.log("Render")
  return (
    <header className="w-full bg-green-400 h-14 flex items-center shadow-md">
      <div className="max-w-6xl w-full flex items-center px-4">
        <img
          src="/resources/logo.svg"
          alt="Logo"
          className="h-8 w-8"
        />  
        <h1 className="ml-2 text-lg font-semibold text-gray-800">
          AgroEcommerce
        </h1>
      </div>
    </header>
  );
}
