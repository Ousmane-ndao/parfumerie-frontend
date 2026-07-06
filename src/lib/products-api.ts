import type { Product } from "./products";
import { fallbackProducts } from "./fallback-products";
import { api } from "@/services/api";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get<Product[]>("/products");
    return data;
  } catch (error) {
    console.warn("API produits indisponible, catalogue statique:", error);
    return fallbackProducts;
  }
}

export async function fetchProduct(ref: string): Promise<Product | undefined> {
  try {
    const { data } = await api.get<Product>(`/products/${encodeURIComponent(ref)}`);
    return data;
  } catch (error) {
    console.warn("API produit indisponible, fallback statique:", error);
    return fallbackProducts.find((p) => p.ref === ref);
  }
}
