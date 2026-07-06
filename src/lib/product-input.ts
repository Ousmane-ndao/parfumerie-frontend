import type { PerfumeFamily, Product, ProductType } from "./products";

export type ProductInput = {
  ref: string;
  name: string;
  type: ProductType;
  family?: PerfumeFamily | null;
  price: number;
  image: string;
  short: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  contenance: string;
  concentration: string;
  available: boolean;
  featured?: boolean;
};

export type ProductWithId = Product & { id: number };
