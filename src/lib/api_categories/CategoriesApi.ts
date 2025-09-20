import { Categorie } from "@/types/Categorie";

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

export async function getAllCategories(): Promise<Categorie[]> {
  return request<Categorie[]>("/categories");
}

export async function getActiveCategories(): Promise<Categorie[]> {
  return request<Categorie[]>("/categories/active");
}

export async function getCategoryById(id: number): Promise<Categorie> {
  return request<Categorie>(`/categories/${id}`);
}

export async function createCategory(category: Categorie): Promise<Categorie> {
  return request<Categorie>("/categories", {
    method: "POST",
    body: JSON.stringify(category),
  });
}

export async function updateCategory(id: number, category: Partial<Categorie>): Promise<Categorie> {
  return request<Categorie>(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(category),
  });
}

export async function deleteCategory(id: number): Promise<void> {
  await request(`/categories/${id}`, { method: "DELETE" });
}
