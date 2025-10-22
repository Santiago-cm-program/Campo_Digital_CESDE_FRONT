import axios from "axios";
import { Sale } from "@/types/Sale";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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

export async function createSaleWithDetails(sale: Sale): Promise<Sale> {
  return requestPrivate<Sale>("/sales/POST/sale", {
    method: "POST",
    data: sale,
  });
}
