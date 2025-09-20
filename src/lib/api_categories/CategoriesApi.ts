import axios from "axios";
import { Categorie } from "@/types/Categorie";

const API_URL = process.env.API_URL!;

function getAxiosInstance() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (!username || !password) {
    throw new Error("Usuario no autenticado");
  }

  const basicAuth = btoa(`${username}:${password}`);

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${basicAuth}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      throw new Error(`Request failed: ${status} ${statusText}`);
    }
  );

  return api;
}

export async function getAllCategories(): Promise<Categorie[]> {
  const { data } = await getAxiosInstance().get<Categorie[]>("/categories");
  return data;
}

export async function getActiveCategories(): Promise<Categorie[]> {
  const { data } = await getAxiosInstance().get<Categorie[]>("/categories/active");
  return data;
}

export async function getCategoryById(id: number): Promise<Categorie> {
  const { data } = await getAxiosInstance().get<Categorie>(`/categories/${id}`);
  return data;
}

export async function createCategory(category: Categorie): Promise<Categorie> {
  const { data } = await getAxiosInstance().post<Categorie>("/categories", category);
  return data;
}

export async function updateCategory(
  id: number,
  category: Partial<Categorie>
): Promise<Categorie> {
  const { data } = await getAxiosInstance().patch<Categorie>(`/categories/${id}`, category);
  return data;
}

export async function deleteCategory(id: number): Promise<void> {
  await getAxiosInstance().delete(`/categories/${id}`);
}
