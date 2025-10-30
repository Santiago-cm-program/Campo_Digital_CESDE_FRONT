import axios from "axios";
import { Sale } from "@/types/Sale";

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

  // ✅ Si es un error estándar de JavaScript
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  // ✅ Fallback si el tipo es desconocido
  throw new Error("Error desconocido en la solicitud");
}

// --- Función genérica para peticiones privadas ---
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

// --- Crear una venta con detalles ---
export async function createSaleWithDetails(sale: Sale): Promise<Sale> {
  return requestPrivate<Sale>("/sales/POST/sale", {
    method: "POST",
    data: sale,
  });
}
