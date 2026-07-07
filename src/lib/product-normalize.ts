import type { PerfumeFamily, Product, ProductType } from "./products";
import { perfumeFamilies, productTypes } from "./products";

/** Retire les accents pour comparer des libellés API / base de données. */
function stripAccents(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
}

const TYPE_ALIASES: Record<string, ProductType> = {
  parfum: "Parfum",
  "diffuseur electrique": "Diffuseur électrique",
  "diffuseur électrique": "Diffuseur électrique",
  diffuseur: "Diffuseur électrique",
  "appareil doppler": "Appareil Doppler",
  doppler: "Appareil Doppler",
};

const FAMILY_ALIASES: Record<string, PerfumeFamily> = {
  floral: "Floral",
  boise: "Boisé",
  boisé: "Boisé",
  oriental: "Oriental",
  frais: "Frais",
};

/** Normalise le type produit renvoyé par l'API (accents, casse, variantes). */
export function normalizeProductType(value: unknown): ProductType {
  const raw = String(value ?? "").trim();
  if (!raw) return "Parfum";

  if (productTypes.includes(raw as ProductType)) {
    return raw as ProductType;
  }

  const alias = TYPE_ALIASES[stripAccents(raw)];
  if (alias) return alias;

  const folded = stripAccents(raw);
  if (folded.includes("diffuseur")) return "Diffuseur électrique";
  if (folded.includes("doppler")) return "Appareil Doppler";
  if (folded.includes("parfum")) return "Parfum";

  return raw as ProductType;
}

/** Normalise la famille olfactive. */
export function normalizeFamily(value: unknown): PerfumeFamily | undefined {
  if (value == null || value === "") return undefined;
  const raw = String(value).trim();
  if (perfumeFamilies.includes(raw as PerfumeFamily)) {
    return raw as PerfumeFamily;
  }
  return FAMILY_ALIASES[stripAccents(raw)];
}

/** Compare deux types produit (tolère les variantes API). */
export function productTypesMatch(a: unknown, b: unknown): boolean {
  return normalizeProductType(a) === normalizeProductType(b);
}

/** Normalise un produit brut renvoyé par l'API. */
export function normalizeProduct<T extends Record<string, unknown>>(raw: T): Product & { id?: number } {
  const notesRaw = raw.notes;
  const notes =
    notesRaw && typeof notesRaw === "object"
      ? {
          top: Array.isArray((notesRaw as { top?: unknown }).top)
            ? ((notesRaw as { top: unknown[] }).top.map(String))
            : [],
          heart: Array.isArray((notesRaw as { heart?: unknown }).heart)
            ? ((notesRaw as { heart: unknown[] }).heart.map(String))
            : [],
          base: Array.isArray((notesRaw as { base?: unknown }).base)
            ? ((notesRaw as { base: unknown[] }).base.map(String))
            : [],
        }
      : { top: [], heart: [], base: [] };

  return {
    id: typeof raw.id === "number" ? raw.id : undefined,
    ref: String(raw.ref ?? ""),
    name: String(raw.name ?? ""),
    type: normalizeProductType(raw.type),
    family: normalizeFamily(raw.family),
    price: Number(raw.price ?? 0),
    image: String(raw.image ?? ""),
    short: String(raw.short ?? raw.short_description ?? ""),
    description: String(raw.description ?? ""),
    notes,
    contenance: String(raw.contenance ?? ""),
    concentration: String(raw.concentration ?? ""),
    available: raw.available !== false && raw.available !== 0,
    featured: Boolean(raw.featured),
  };
}

export function normalizeProducts<T extends Record<string, unknown>>(items: T[]): Product[] {
  return items.map(normalizeProduct);
}
