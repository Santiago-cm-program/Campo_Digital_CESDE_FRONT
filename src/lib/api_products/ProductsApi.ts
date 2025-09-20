import { Product } from "@/types/Product";

const API_URL = process.env.API_URL!;
const API_USER = process.env.API_USER!;
const API_PASSWORD = process.env.API_PASSWORD!;

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${API_USER}:${API_PASSWORD}`).toString("base64"),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getAllProducts(): Promise<Product[]> {
  return request<Product[]>("/products");
}

export async function getActiveProducts(): Promise<Product[]> {
  return request<Product[]>("/products/active");
}

export async function getProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`);
}

export async function createProduct(product: Product): Promise<Product> {
  return request<Product>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  return request<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: number): Promise<void> {
  await request(`/products/${id}`, { method: "DELETE" });
}
