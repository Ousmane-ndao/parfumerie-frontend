import type { PerfumeFamily, Product, ProductType } from "./products";

export type CategoryAccent = "rose" | "emerald" | "gold";

export type CatalogCategoryConfig = {
  type: ProductType;
  slug: string;
  label: string;
  description: string;
  emptyTitle: string;
  emptyMessage: string;
  accent: CategoryAccent;
};

export const catalogCategories: CatalogCategoryConfig[] = [
  {
    type: "Parfum",
    slug: "parfums",
    label: "Parfums",
    description: "Fragrances florales, boisées, orientales et fraîches.",
    emptyTitle: "Aucun parfum pour le moment",
    emptyMessage: "Notre sélection de parfums sera bientôt enrichie.",
    accent: "rose",
  },
  {
    type: "Diffuseur électrique",
    slug: "diffuseurs-electriques",
    label: "Diffuseurs électriques",
    description: "Diffuseurs de brume, parfums de maison et coffrets prestige.",
    emptyTitle: "Aucun diffuseur pour le moment",
    emptyMessage: "De nouveaux diffuseurs électriques seront ajoutés prochainement.",
    accent: "emerald",
  },
  {
    type: "Appareil Doppler",
    slug: "appareils-doppler",
    label: "Appareils Doppler",
    description: "Appareils de diagnostic et de suivi Doppler — gamme à venir.",
    emptyTitle: "Produits bientôt disponibles",
    emptyMessage:
      "La catégorie Appareils Doppler est en préparation. Revenez bientôt ou contactez-nous pour être informé des nouveautés.",
    accent: "gold",
  },
];

export const catalogSlugs = catalogCategories.map((c) => c.slug);

export function getCategoryBySlug(slug: string): CatalogCategoryConfig | undefined {
  return catalogCategories.find((c) => c.slug === slug);
}

export function getCategoryByType(type: ProductType): CatalogCategoryConfig {
  return catalogCategories.find((c) => c.type === type)!;
}

export function getProductsByType(all: Product[], type: ProductType): Product[] {
  const normalized = type.trim().normalize("NFC");
  return all.filter((p) => String(p.type ?? "").trim().normalize("NFC") === normalized);
}

export function countProductsByType(all: Product[], type: ProductType): number {
  return getProductsByType(all, type).length;
}

export function productDisplayBadge(product: Product): string {
  const { label } = getCategoryByType(product.type);
  if (product.type === "Parfum" && product.family) return `${label} · ${product.family}`;
  return label;
}

export function isPerfumeFamily(value: string): value is PerfumeFamily {
  return ["Floral", "Boisé", "Oriental", "Frais"].includes(value);
}
