import axios from "axios";
import { Product } from "@/types/Product";

const API_URL = process.env.API_URL!;

const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function getPrivateApi() {
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

async function requestPrivate<T>(endpoint: string, options: any = {}): Promise<T> {
  try {
    const res = await getPrivateApi().request<T>({
      url: endpoint,
      ...options,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Request failed: ${error.response.status} ${error.response.statusText}`
      );
    }
    throw new Error(error.message || "Request failed");
  }
}

async function requestPublic<T>(endpoint: string, options: any = {}): Promise<T> {
  try {
    const res = await publicApi.request<T>({
      url: endpoint,
      ...options,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Request failed: ${error.response.status} ${error.response.statusText}`
      );
    }
    throw new Error(error.message || "Request failed");
  }
}

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
