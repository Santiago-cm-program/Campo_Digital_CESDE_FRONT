import axios from "axios";
import { Product } from "@/types/Product";

const API_URL = process.env.API_URL!;

function getAxiosInstance() {
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

async function request<T>(endpoint: string, options: any = {}): Promise<T> {
  const axiosInstance = getAxiosInstance();

  try {
    const res = await axiosInstance.request<T>({
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
  return request<Product[]>("/products", { method: "GET" });
}

export async function getActiveProducts(): Promise<Product[]> {
  return request<Product[]>("/products/active", { method: "GET" });
}

export async function getProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`, { method: "GET" });
}

export async function createProduct(product: Product): Promise<Product> {
  return request<Product>("/products", {
    method: "POST",
    data: product,
  });
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
): Promise<Product> {
  return request<Product>(`/products/${id}`, {
    method: "PATCH",
    data: product,
  });
}

export async function deleteProduct(id: number): Promise<void> {
  return request<void>(`/products/${id}`, { method: "DELETE" });
}
