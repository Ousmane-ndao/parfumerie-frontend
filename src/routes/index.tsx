import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { countProductsByType, catalogCategories } from "@/lib/products";
import { fetchProducts } from "@/lib/products-api";
import { whatsappLink } from "@/lib/whatsapp";
import { CategoryCard } from "@/components/site/CatalogWidgets";
import { HeroProductOrbit } from "@/components/site/HeroProductMarquee";
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
      {/* HERO compact */}
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

          <div className="relative order-1 lg:order-2 flex items-center justify-center min-h-[280px] md:min-h-[340px]">
            <HeroProductOrbit products={products} />
            <div className="relative z-10">
              <img
                src={logo}
                alt="Salaicha parfumeur"
                width={400}
                height={160}
                className="w-auto h-auto max-h-40 md:max-h-56 object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS PHARES */}
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

      {/* CATÉGORIES */}
      <section className="container-x pb-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {catalogCategories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              count={countProductsByType(products, cat.type)}
              accent={cat.accent}
            />
          ))}
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="border-y border-border bg-card/50">
        <div className="container-x py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                t: "Matières d'exception",
                d: "Essences naturelles soigneusement sélectionnées.",
              },
              {
                icon: ShieldCheck,
                t: "Qualité garantie",
                d: "Chaque produit est contrôlé avant livraison.",
              },
              {
                icon: Truck,
                t: "Livraison nationale",
                d: "Dakar et tout le Sénégal via WhatsApp.",
              },
            ].map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="flex gap-3 rounded-xl border border-border/70 bg-background p-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-primary">{t}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-12">
        <div className="rounded-2xl bg-emerald-deep text-cream p-8 md:p-10 grid gap-6 md:grid-cols-2 items-center shadow-elegant">
          <div>
            <h2 className="font-display text-3xl text-rose">Une expérience sur-mesure</h2>
            <p className="mt-2 text-sm text-cream/85">
              Conseils, paiement et livraison convenus directement via WhatsApp Business.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href={whatsappLink("Bonjour, j'aimerais être conseillé(e) sur un produit.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="container-x pb-10">
        <p className="text-center text-xs italic text-muted-foreground max-w-2xl mx-auto">
          Commandes via WhatsApp Business — aucun paiement en ligne sur ce site.
        </p>
      </section>
    </>
  );
}
