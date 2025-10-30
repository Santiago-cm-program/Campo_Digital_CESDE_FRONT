import axios from "axios";
import { Product } from "@/types/Product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// --- Instancia pública ---
const publicApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// --- Instancia privada con autenticación básica ---
function getPrivateApi() {
  if (typeof window === "undefined") {
    throw new Error("LocalStorage no está disponible en el servidor");
  }

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (!username || !password) {
    throw new Error("Usuario no autenticado");
  }

  const basicAuth = btoa(`${username}:${password}`);

  return axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });
}

// --- Manejo de errores seguro ---
function handleAxiosError(error: unknown): never {
  // ✅ Verificamos si es un error de Axios sin depender del tipado de axios.isAxiosError
  if (typeof error === "object" && error !== null && "isAxiosError" in error) {
    const err = error as { response?: { status?: number; statusText?: string } };
    const status = err.response?.status ?? "Sin código";
    const statusText = err.response?.statusText ?? "Error desconocido";
    throw new Error(`Request failed: ${status} ${statusText}`);
  }

  // ✅ Verificamos si es un Error nativo
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  // ✅ Cualquier otro caso desconocido
  throw new Error("Error desconocido en la solicitud");
}

// --- Peticiones privadas ---
async function requestPrivate<T>(
  endpoint: string,
  options: Record<string, unknown> = {}
): Promise<T> {
  try {
    const api = getPrivateApi();
    const res = await api.request<T>({
      url: endpoint,
      ...options,
    });
    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error);
  }
}

// --- Peticiones públicas ---
async function requestPublic<T>(
  endpoint: string,
  options: Record<string, unknown> = {}
): Promise<T> {
  try {
    const res = await publicApi.request<T>({
      url: endpoint,
      ...options,
    });
    return res.data;
  } catch (error: unknown) {
    handleAxiosError(error);
  }
}

// --- Funciones CRUD de productos ---
export async function getAllProducts(): Promise<Product[]> {
  return requestPrivate<Product[]>("/products/GET/all", { method: "GET" });
}

export async function getActiveProducts(): Promise<Product[]> {
  return requestPublic<Product[]>("/products/GET/active", { method: "GET" });
}

export async function getProductById(id: number): Promise<Product> {
  return requestPrivate<Product>(`/products/GET/${id}`, { method: "GET" });
}

export async function createProduct(product: Product): Promise<Product> {
  return requestPrivate<Product>("/products/POST", {
    method: "POST",
    data: product,
  });
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
): Promise<Product> {
  return requestPrivate<Product>(`/products/PATCH/${id}`, {
    method: "PATCH",
    data: product,
  });
}

export async function deleteProduct(id: number): Promise<void> {
  return requestPrivate<void>(`/products/DELETE/${id}`, { method: "DELETE" });
}
