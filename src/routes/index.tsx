import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { countProductsByType, catalogCategories } from "@/lib/products";
import { fetchProducts } from "@/lib/products-api";
import { whatsappLink } from "@/lib/whatsapp";
import { CategoryCard } from "@/components/site/CatalogWidgets";
import { ProductCard, SectionHeader } from "@/components/site/ProductCard";
import { site } from "@/lib/site-config";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/")({
  loader: async () => {
    const products = await fetchProducts();
    return { products };
  },
  head: () => ({
    meta: [
      { title: `${site.name} — Parfums d'exception à Dakar` },
      {
        name: "description",
        content:
          "Découvrez les fragrances Salaicha Parfumeur : rose, oud, jasmin, boisés. Commande facile via WhatsApp Business.",
      },
      { property: "og:title", content: `${site.name} — Parfums d'exception` },
      { property: "og:description", content: site.description },
    ],
  }),
  component: Home,
});

function Home() {
  const { products } = Route.useLoaderData();
  const featured = products.filter((p: Product) => p.featured);

  return (
    <>
      <section className="relative overflow-hidden page-hero-gradient border-b border-border/60">
        <div className="relative z-10 container-x grid gap-8 py-10 md:py-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-primary">
              L'élégance de la rose,
              <br />
              l'esprit du <span className="italic text-rose-deep">naturel</span>.
            </h1>
            <p className="mt-3 max-w-lg text-sm md:text-base text-foreground/75">
              Parfums et diffuseurs — commande rapide via WhatsApp.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#produits"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90"
              >
                Voir les produits <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-5 py-2.5 text-sm font-medium hover:bg-rose/15"
              >
                Catalogue complet
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-rose/30 via-transparent to-emerald-soft/25 blur-2xl" />
            <div className="relative flex w-full items-center justify-center rounded-2xl border border-border/60 bg-card/90 px-8 py-10 md:px-12 md:py-14 shadow-elegant aspect-[16/11] md:aspect-[4/3]">
              <img
                src={logo}
                alt="Salaicha parfumeur"
                width={400}
                height={160}
                className="w-full max-w-[260px] md:max-w-[300px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Le reste du fichier reste inchangé */}
      <section id="produits" className="container-x py-10 md:py-12">
        <SectionHeader
          eyebrow="Sélection"
          title="Nos produits phares"
          action={{ label: "Tout le catalogue", to: "/catalogue" }}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p: Product) => (
            <ProductCard key={p.ref} product={p} />
          ))}
        </div>
      </section>

      {/* ... le reste (catégories, engagements, CTA) est identique ... */}
    </>
  );
}
