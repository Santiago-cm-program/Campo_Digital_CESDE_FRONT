import axios from "axios";
import { Categorie } from "@/types/Categorie";

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

export async function getAllCategories(): Promise<Categorie[]> {
  const { data } = await getPrivateApi().get<Categorie[]>("/categories/GET/all");
  return data;
}

export async function getCategoryById(id: number): Promise<Categorie> {
  const { data } = await getPrivateApi().get<Categorie>(`/categories/GET/${id}`);
  return data;
}

export async function createCategory(category: Categorie): Promise<Categorie> {
  const { data } = await getPrivateApi().post<Categorie>("/categories/POST", category);
  return data;
}

export async function updateCategory(
  id: number,
  category: Partial<Categorie>
): Promise<Categorie> {
  const { data } = await getPrivateApi().patch<Categorie>(`/categories/PUT/${id}`, category);
  return data;
}

export async function deleteCategory(id: number): Promise<void> {
  await getPrivateApi().delete(`/categories/DELETE/${id}`);
}

export async function getActiveCategories(): Promise<Categorie[]> {
  const { data } = await publicApi.get<Categorie[]>("/categories/GET/active");
  return data;
}
