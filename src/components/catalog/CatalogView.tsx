"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Package, X, MessageCircle } from "lucide-react";
import type { Product, ProductType, PerfumeFamily } from "@/lib/products";
import { perfumeFamilies, countProductsByType } from "@/lib/products";
import { catalogCategories, type CatalogCategoryConfig } from "@/lib/catalog";
import { ProductCard, SectionHeader } from "@/components/site/ProductCard";
import { CategoryPageHeader } from "@/components/catalog/CategoryPageHeader";
import { EmptyCategoryPanel } from "@/components/catalog/EmptyCategoryPanel";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type SortOption = "default" | "price-asc" | "price-desc" | "name";

const sortLabels: Record<SortOption, string> = {
  default: "Par défaut",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  name: "Nom A → Z",
};

type CatalogViewProps = {
  products: Product[];
  /** Catégorie fixe (page dédiée) ou undefined pour le catalogue complet */
  fixedCategory?: CatalogCategoryConfig;
};

/** Normalise le type produit (espaces, unicode) pour comparer avec la config catalogue. */
function normalizeType(value: unknown): string {
  return String(value ?? "").trim().normalize("NFC");
}

function typesMatch(a: unknown, b: unknown): boolean {
  return normalizeType(a) === normalizeType(b);
}

function isParfumFilterActive(
  fixedCategory: CatalogCategoryConfig | undefined,
  productType: ProductType | "Tous",
): boolean {
  return fixedCategory?.type === "Parfum" || productType === "Parfum";
}

export function CatalogView({ products, fixedCategory }: CatalogViewProps) {
  const [q, setQ] = useState("");
  const [productType, setProductType] = useState<ProductType | "Tous">(
    fixedCategory?.type ?? "Tous",
  );
  const [family, setFamily] = useState<PerfumeFamily | "Tous">("Tous");
  const [sort, setSort] = useState<SortOption>("default");

  // Resynchroniser les filtres quand on change de page catalogue / catégorie
  useEffect(() => {
    setProductType(fixedCategory?.type ?? "Tous");
    setFamily("Tous");
  }, [fixedCategory?.slug]);

  const parfumFilterActive = isParfumFilterActive(fixedCategory, productType);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();

    let result = products.filter((p) => {
      const matchType = productType === "Tous" || typesMatch(p.type, productType);

      // Le filtre famille ne s'applique que sur la catégorie Parfums
      const matchFamily =
        !parfumFilterActive || family === "Tous" || p.family === family;

      const matchQ =
        query === "" ||
        p.name.toLowerCase().includes(query) ||
        (p.short ?? "").toLowerCase().includes(query) ||
        p.ref.toLowerCase().includes(query);

      return matchType && matchFamily && matchQ;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, "fr"));
        break;
    }
    return result;
  }, [products, q, productType, family, sort, parfumFilterActive]);

  const hasFilters =
    q.trim() !== "" ||
    (!fixedCategory && productType !== "Tous") ||
    (parfumFilterActive && family !== "Tous") ||
    sort !== "default";

  function resetFilters() {
    setQ("");
    setProductType(fixedCategory?.type ?? "Tous");
    setFamily("Tous");
    setSort("default");
  }

  const pageTitle = fixedCategory?.label ?? "Notre catalogue";
  const isEmptyCategory = Boolean(fixedCategory && list.length === 0);
  const showGroupedCatalog =
    !fixedCategory && productType === "Tous" && family === "Tous" && q.trim() === "";

  return (
    <>
      {fixedCategory ? (
        <CategoryPageHeader category={fixedCategory} products={products} />
      ) : (
        <section className="page-hero-gradient border-b border-border/60">
          <div className="container-x py-5 md:py-6">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-medium">
              Collection
            </p>
            <h1 className="mt-1 font-display text-3xl md:text-4xl text-primary leading-tight">
              {pageTitle}
            </h1>
            {products.length > 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                {list.length} produit{list.length > 1 ? "s" : ""} affiché
                {list.length !== products.length ? ` sur ${products.length}` : ""}
              </p>
            )}
          </div>
        </section>
      )}

      <div className="sticky top-[4.25rem] z-30 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="container-x py-2.5 space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher…"
                className="w-full rounded-full border border-border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs outline-none focus:border-primary cursor-pointer"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <option key={key} value={key}>
                    {sortLabels[key]}
                  </option>
                ))}
              </select>
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  <X className="h-3 w-3" /> Réinitialiser
                </button>
              )}
            </div>
          </div>

          {!fixedCategory && (
            <nav className="flex flex-wrap gap-1.5" aria-label="Catégories produits">
              <Link
                to="/catalogue"
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] tracking-wide transition-colors",
                  productType === "Tous"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                Tout ({products.length})
              </Link>
              {catalogCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/catalogue/$slug"
                  params={{ slug: cat.slug }}
                  className="rounded-full border border-border bg-card px-3 py-1 text-[11px] tracking-wide hover:border-primary/40 transition-colors"
                >
                  {cat.label}
                  <span className="ml-1 opacity-60">
                    ({countProductsByType(products, cat.type)})
                  </span>
                </Link>
              ))}
            </nav>
          )}

          {fixedCategory && (
            <nav className="flex flex-wrap gap-1.5" aria-label="Catégories produits">
              <Link
                to="/catalogue"
                className="rounded-full border border-border bg-card px-3 py-1 text-[11px] tracking-wide hover:border-primary/40"
              >
                Tout le catalogue
              </Link>
              {catalogCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/catalogue/$slug"
                  params={{ slug: cat.slug }}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] tracking-wide transition-colors",
                    fixedCategory.slug === cat.slug
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          )}

          {parfumFilterActive && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-1">
                Famille
              </span>
              {(["Tous", ...perfumeFamilies] as const).map((f) => {
                const count =
                  f === "Tous"
                    ? products.filter((p) => typesMatch(p.type, "Parfum")).length
                    : products.filter((p) => typesMatch(p.type, "Parfum") && p.family === f).length;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFamily(f)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider",
                      family === f
                        ? "border-rose-deep bg-rose/25 text-rose-deep"
                        : "border-border bg-background hover:border-rose-deep/40",
                    )}
                  >
                    {f} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <section
        id={fixedCategory ? "produits-categorie" : undefined}
        className="container-x py-6 md:py-8"
      >
        {fixedCategory && !isEmptyCategory && list.length > 0 && (
          <SectionHeader
            eyebrow="Sélection"
            title={`Nos ${fixedCategory.label.toLowerCase()}`}
            description={`${list.length} produit${list.length > 1 ? "s" : ""} dans cette catégorie${hasFilters ? " (filtres actifs)" : ""}.`}
            action={{ label: "Tout le catalogue", to: "/catalogue" }}
          />
        )}

        <div className={fixedCategory && !isEmptyCategory && list.length > 0 ? "mt-5" : ""}>
          {isEmptyCategory ? (
            <EmptyCategoryPanel category={fixedCategory!} onReset={resetFilters} />
          ) : list.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h2 className="mt-4 font-display text-2xl text-primary">Aucun produit trouvé</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Modifiez votre recherche ou réinitialisez les filtres.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Réinitialiser
              </button>
            </div>
          ) : showGroupedCatalog ? (
            <div className="space-y-8">
              {catalogCategories.map((cat) => {
                const sectionProducts = list.filter((p) => typesMatch(p.type, cat.type));
                if (sectionProducts.length === 0) return null;
                return (
                  <CategorySection
                    key={cat.type}
                    category={cat}
                    products={sectionProducts}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => (
                <ProductCard key={p.ref} product={p} showRef />
              ))}
            </div>
          )}
        </div>
      </section>

      {fixedCategory && !isEmptyCategory && (
        <section className="container-x pb-12">
          <div className="rounded-2xl bg-emerald-deep text-cream p-8 md:p-10 grid gap-6 md:grid-cols-2 items-center shadow-elegant">
            <div>
              <h2 className="font-display text-3xl text-rose">
                Besoin d&apos;un conseil {fixedCategory.label.toLowerCase()} ?
              </h2>
              <p className="mt-2 text-sm text-cream/85">
                Notre équipe vous guide sur WhatsApp — choix, disponibilité et livraison.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={whatsappLink(
                  `Bonjour, j'aimerais être conseillé(e) sur vos ${fixedCategory.label.toLowerCase()}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function CategorySection({
  category,
  products: items,
}: {
  category: CatalogCategoryConfig;
  products: Product[];
}) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-4 border-b border-border/60 pb-2">
        <div>
          <h2 className="font-display text-2xl text-primary">{category.label}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
        </div>
        <Link
          to="/catalogue/$slug"
          params={{ slug: category.slug }}
          className="text-sm font-medium text-primary hover:text-rose-deep"
        >
          Voir tout →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.ref} product={p} showRef />
        ))}
      </div>
    </div>
  );
}
