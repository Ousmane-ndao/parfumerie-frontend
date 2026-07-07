import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Wind,
  Activity,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { productTypesMatch } from "@/lib/product-normalize";
import { type CatalogCategoryConfig, type CategoryAccent } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const accentStyles: Record<
  CategoryAccent,
  { glow: string; card: string; icon: string; badge: string }
> = {
  rose: {
    glow: "from-rose/40 via-transparent to-emerald-soft/20",
    card: "from-rose/25 via-card/95 to-rose/5 border-rose/25",
    icon: "bg-rose/20 text-rose-deep",
    badge: "bg-rose/15 text-rose-deep border-rose/25",
  },
  emerald: {
    glow: "from-emerald-soft/35 via-transparent to-rose/15",
    card: "from-emerald-soft/20 via-card/95 to-emerald-soft/5 border-emerald-soft/30",
    icon: "bg-emerald-soft/20 text-emerald-deep",
    badge: "bg-emerald-soft/15 text-emerald-deep border-emerald-soft/30",
  },
  gold: {
    glow: "from-gold/35 via-transparent to-rose/10",
    card: "from-gold/25 via-card/95 to-gold/5 border-gold/30",
    icon: "bg-gold/20 text-gold",
    badge: "bg-gold/15 text-gold border-gold/30",
  },
};

const categoryIcons: Record<Product["type"], LucideIcon> = {
  Parfum: Sparkles,
  "Diffuseur électrique": Wind,
  "Appareil Doppler": Activity,
};

type CategoryPageHeaderProps = {
  category: CatalogCategoryConfig;
  products: Product[];
};

export function CategoryPageHeader({ category, products }: CategoryPageHeaderProps) {
  const items = products.filter((p) => productTypesMatch(p.type, category.type));
  const available = items.filter((p) => p.available).length;
  const featured = items.filter((p) => p.featured).length;
  const styles = accentStyles[category.accent];
  const Icon = categoryIcons[category.type];

  return (
    <>
      <section className="relative overflow-hidden page-hero-gradient border-b border-border/60">
        <div className="container-x grid gap-5 py-6 md:py-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
          <div>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Tout le catalogue
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-rose-deep font-medium">
              Catégorie
            </p>
            <h1 className="mt-1 font-display text-3xl md:text-4xl leading-tight text-primary">
              {category.label}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-foreground/75 leading-relaxed">
              {category.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="#produits-categorie"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90"
              >
                Voir les produits <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={whatsappLink(
                  `Bonjour, j'aimerais être conseillé(e) sur vos ${category.label.toLowerCase()}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-card px-4 py-2 text-sm font-medium hover:bg-rose/15"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:w-72">
            <div
              className={cn(
                "absolute -inset-3 rounded-2xl bg-gradient-to-tr blur-2xl",
                styles.glow,
              )}
            />
            <div
              className={cn(
                "relative w-full rounded-xl border bg-gradient-to-br p-4 shadow-elegant",
                styles.card,
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    styles.icon,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-1 justify-around text-center">
                  {[
                    { label: "Produits", value: items.length },
                    { label: "Dispo.", value: available },
                    { label: "Phares", value: featured },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-display text-xl text-primary leading-none">{value}</p>
                      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
