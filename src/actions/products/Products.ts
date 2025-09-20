"use server";

import { createProduct, updateProduct, deleteProduct } from "@/lib/api_products/ProductsApi";
import { Product } from "@/types/Product";

export async function createProductAction(product: Product) {
  return createProduct(product);
}

export async function updateProductAction(id: number, data: Partial<Product>) {
  return updateProduct(id, data);
}

export async function deleteProductAction(id: number) {
  return deleteProduct(id);
}