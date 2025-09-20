"use client";
import React from "react";
import { Categorie } from "../../types/Categorie";

type Props = {
    categorie: Categorie;
}

export default function CategorieRender({ categorie }: Props) {
    return (
        <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800">{categorie.categoria}</h3>
            <p className={`mt-2 text-sm ${categorie.active ? 'text-green-600' : 'text-red-600'}`}>
                {categorie.active ? 'Active' : 'Inactive'}
            </p>
        </div>
    );
}