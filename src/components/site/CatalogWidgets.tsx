import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogCategoryConfig } from "@/lib/catalog";

type StatItem = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export function StatsBar({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur px-5 py-4 shadow-soft"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-2xl text-primary leading-none">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type CategoryCardProps = {
  category: CatalogCategoryConfig;
  count: number;
  accent?: "rose" | "emerald" | "gold";
  active?: boolean;
};

const accents = {
  rose: "from-rose/30 to-rose/5 border-rose/20",
  emerald: "from-emerald-soft/25 to-emerald-soft/5 border-emerald-soft/30",
  gold: "from-gold/30 to-gold/5 border-gold/30",
};

export function CategoryCard({ category, count, accent = "rose", active = false }: CategoryCardProps) {
  const empty = count === 0;
  return (
    <Link
      to="/catalogue/$slug"
      params={{ slug: category.slug }}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant",
        accents[accent],
        active && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-elegant -translate-y-0.5",
      )}
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {empty ? "Bientôt disponible" : `${count} produit${count > 1 ? "s" : ""}`}
      </p>
      <h3 className="mt-2 font-display text-2xl text-primary group-hover:text-rose-deep transition-colors">
        {category.label}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{category.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
        {empty ? "Découvrir la catégorie →" : "Explorer →"}
      </span>
    </Link>
  );
}
