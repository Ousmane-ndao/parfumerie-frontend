import type { Product } from "./products";
import { api } from "@/services/api";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get<Product[]>("/products");
    return data;
  } catch (error) {
    console.warn("API produits indisponible:", error);
    // Retourner un tableau vide pour éviter de casser l'application
    return [];
  }
}

export async function fetchProduct(ref: string): Promise<Product | undefined> {
  try {
    const { data } = await api.get<Product>(`/products/${encodeURIComponent(ref)}`);
    return data;
  } catch (error) {
    console.warn("API produit indisponible:", error);
    return undefined;
  }
}
