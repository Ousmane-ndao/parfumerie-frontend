export const productTypes = ["Parfum", "Diffuseur électrique", "Appareil Doppler"] as const;
export type ProductType = (typeof productTypes)[number];

export const perfumeFamilies = ["Floral", "Boisé", "Oriental", "Frais"] as const;
export type PerfumeFamily = (typeof perfumeFamilies)[number];

/** @deprecated Utiliser `type` et `family` */
export const perfumeCategories = perfumeFamilies;
export type PerfumeCategory = PerfumeFamily;
export type Category = PerfumeFamily | ProductType;

export interface Product {
  ref: string;
  name: string;
  type: ProductType;
  family?: PerfumeFamily;
  price: number; // FCFA
  image: string;
  short: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  contenance: string;
  concentration: string;
  available: boolean;
  featured?: boolean;
}

export function isParfum(product: Product): boolean {
  return product.type === "Parfum";
}

export {
  catalogCategories,
  catalogSlugs,
  getCategoryBySlug,
  getCategoryByType,
  getProductsByType,
  countProductsByType,
  productDisplayBadge,
} from "./catalog";

/** @deprecated Utiliser `productDisplayBadge` depuis `@/lib/catalog` */
export { productDisplayBadge as productBadge } from "./catalog";

export const categories = productTypes;

export function formatFCFA(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
}
