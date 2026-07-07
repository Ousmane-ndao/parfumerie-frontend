import { Link } from "@tanstack/react-router";
import { Activity, MessageCircle, Sparkles, Wind, type LucideIcon } from "lucide-react";
import type { Product } from "@/lib/products";
import { catalogCategories, type CatalogCategoryConfig, type CategoryAccent } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const accentStyles: Record<CategoryAccent, { wrap: string; icon: string }> = {
  rose: {
    wrap: "from-rose/20 via-card to-rose/5 border-rose/25",
    icon: "bg-rose/20 text-rose-deep",
  },
  emerald: {
    wrap: "from-emerald-soft/15 via-card to-emerald-soft/5 border-emerald-soft/30",
    icon: "bg-emerald-soft/20 text-emerald-deep",
  },
  gold: {
    wrap: "from-gold/20 via-card to-gold/5 border-gold/30",
    icon: "bg-gold/20 text-gold",
  },
};

const categoryIcons: Record<Product["type"], LucideIcon> = {
  Parfum: Sparkles,
  "Diffuseur électrique": Wind,
  "Appareil Doppler": Activity,
};

type EmptyCategoryPanelProps = {
  category: CatalogCategoryConfig;
  compact?: boolean;
  onReset?: () => void;
};

export function EmptyCategoryPanel({
  category,
  compact = false,
  onReset,
}: EmptyCategoryPanelProps) {
  const styles = accentStyles[category.accent];
  const Icon = categoryIcons[category.type];
  const others = catalogCategories.filter((c) => c.slug !== category.slug);

  return (
    <div
      className={cn(
        "rounded-2xl border bg-gradient-to-br text-center shadow-soft",
        styles.wrap,
        compact ? "px-5 py-8" : "px-6 py-10 md:px-10",
      )}
    >
      <div className={cn("mx-auto grid h-12 w-12 place-items-center rounded-xl", styles.icon)}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Bientôt disponible
      </p>
      <h2
        className={cn(
          "mt-2 font-display text-primary",
          compact ? "text-xl" : "text-2xl md:text-3xl",
        )}
      >
        {category.emptyTitle}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        {category.emptyMessage}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <a
          href={whatsappLink(
            `Bonjour, je souhaite être informé(e) des nouveautés ${category.label.toLowerCase()}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" /> Me prévenir sur WhatsApp
        </a>
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Tout le catalogue
        </Link>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-primary"
          >
            Effacer la recherche
          </button>
        )}
      </div>

      {!compact && others.length > 0 && (
        <div className="mt-6 pt-5 border-t border-border/50">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            En attendant, explorez
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {others.map((cat) => (
              <Link
                key={cat.slug}
                to="/catalogue/$slug"
                params={{ slug: cat.slug }}
                className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs hover:border-primary/40 transition-colors"
              >
                {cat.label} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
