import type { Product } from "./products";
import { api } from "@/services/api";
import { normalizeProduct, normalizeProducts } from "./product-normalize";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get<Record<string, unknown>[]>("/products");
    if (!Array.isArray(data)) {
      console.warn("API produits : réponse inattendue", data);
      return [];
    }
    return normalizeProducts(data);
  } catch (error) {
    console.warn("API produits indisponible:", error);
    return [];
  }
}

export async function fetchProduct(ref: string): Promise<Product | undefined> {
  try {
    const { data } = await api.get<Record<string, unknown>>(
      `/products/${encodeURIComponent(ref)}`,
    );
    return normalizeProduct(data);
  } catch (error) {
    console.warn("API produit indisponible:", error);
    return undefined;
  }
}
