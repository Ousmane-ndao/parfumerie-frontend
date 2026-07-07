import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "./Logo";
import { catalogCategories } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-4">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="text-foreground/70 transition-colors hover:text-primary py-1"
            activeProps={{ className: "text-primary font-medium" }}
            activeOptions={{ exact: true }}
          >
            Accueil
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setCatalogOpen(true)}
            onMouseLeave={() => setCatalogOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-foreground/70 hover:text-primary py-1"
              aria-expanded={catalogOpen}
            >
              Catalogue{" "}
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", catalogOpen && "rotate-180")}
              />
            </button>
            {catalogOpen && (
              <div className="absolute left-0 top-full pt-2 min-w-[15rem]">
                <div className="rounded-xl border border-border bg-card py-2 shadow-elegant">
                  <Link
                    to="/catalogue"
                    className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                    onClick={() => setCatalogOpen(false)}
                  >
                    Tout le catalogue
                  </Link>
                  {catalogCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to="/catalogue/$slug"
                      params={{ slug: cat.slug }}
                      className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                      onClick={() => setCatalogOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/70 transition-colors hover:text-primary py-1"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("Bonjour, je souhaite découvrir vos produits.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white shadow-soft hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-x py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              Accueil
            </Link>
            <p className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Catalogue
            </p>
            <Link
              to="/catalogue"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 hover:bg-muted pl-5"
            >
              Tout le catalogue
            </Link>
            {catalogCategories.map((cat) => (
              <Link
                key={cat.slug}
                to="/catalogue/$slug"
                params={{ slug: cat.slug }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 hover:bg-muted pl-5 text-foreground/85"
              >
                {cat.label}
              </Link>
            ))}
            {nav.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={whatsappLink("Bonjour, je souhaite découvrir vos produits.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-medium text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
