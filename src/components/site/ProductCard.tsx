import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { productDisplayBadge } from "@/lib/catalog";
import { formatFCFA, type Product } from "@/lib/products";
import { OrderWhatsAppButton } from "@/components/site/OrderWhatsAppButton";
import { resolveMediaUrl } from "@/services/api"; // ← IMPORT CORRIGÉ

type ProductCardProps = {
  product: Product;
  showRef?: boolean;
};

export function ProductCard({ product: p, showRef = false }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant">
      <Link to="/produit/$ref" params={{ ref: p.ref }} className="block flex-1">
        <div className="relative overflow-hidden aspect-[4/3] bg-muted">
          <img
            src={resolveMediaUrl(p.image)}
            alt={p.name}
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-background/95 backdrop-blur px-2 py-0.5 text-[9px] uppercase tracking-wider text-rose-deep font-medium shadow-sm max-w-[85%] truncate">
              {productDisplayBadge(p)}
            </span>
            {p.featured && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-gold/90 px-2 py-0.5 text-[9px] uppercase tracking-wider text-ink font-medium shadow-sm">
                <Star className="h-2.5 w-2.5 fill-current" /> Phare
              </span>
            )}
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2">
            <span className="rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
              {formatFCFA(p.price)}
            </span>
            <span className="rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-medium text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Voir →
            </span>
          </div>
        </div>
        <div className="p-3.5">
          {showRef && (
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{p.ref}</p>
          )}
          <h3
            className={`font-display text-lg text-primary line-clamp-2 leading-snug ${
              showRef ? "mt-0.5" : ""
            }`}
          >
            {p.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {p.short}
          </p>
        </div>
      </Link>
      <div className="mt-auto border-t border-border/60 px-3.5 py-2.5">
        <OrderWhatsAppButton
          product={{ name: p.name, ref: p.ref, price: p.price }}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-whatsapp px-3 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
        />
      </div>
    </article>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; to: string; search?: Record<string, string> };
};

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-medium">{eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl md:text-5xl text-primary leading-tight">
          {title}
        </h2>
        {description && <p className="mt-3 text-foreground/70 leading-relaxed">{description}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          search={action.search}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:text-rose-deep transition-colors"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
