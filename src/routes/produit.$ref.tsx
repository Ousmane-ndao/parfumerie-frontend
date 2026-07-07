import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Check, X } from "lucide-react";
import { OrderWhatsAppButton } from "@/components/site/OrderWhatsAppButton";
import { formatFCFA, isParfum, type Product } from "@/lib/products";
import { fetchProduct, fetchProducts } from "@/lib/products-api";

export const Route = createFileRoute("/produit/$ref")({
  loader: async ({ params }) => {
    const product = await fetchProduct(params.ref);
    if (!product) throw notFound();
    const products = await fetchProducts();
    return { product, products };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Produit introuvable" }] };
    return {
      meta: [
        { title: `${p.name} — Salaicha Parfumeur` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} — Salaicha Parfumeur` },
        { property: "og:description", content: p.short },
        { property: "og:image", content: p.image },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            sku: p.ref,
            description: p.description,
            image: p.image,
            category: p.type || "Produit",
            offers: {
              "@type": "Offer",
              priceCurrency: "XOF",
              price: p.price,
              availability: p.available
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-4xl">Produit introuvable</h1>
      <Link to="/catalogue" className="mt-6 inline-block text-primary hover:underline">
        ← Retour au catalogue
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-2xl">Erreur</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ProductPage() {
  const { product: p, products } = Route.useLoaderData();
  const parfum = isParfum(p);
  const related = products
    .filter(
      (x: Product) =>
        x.type === p.type && x.ref !== p.ref && (p.type !== "Parfum" || x.family === p.family),
    )
    .slice(0, 3);

  return (
    <>
      <div className="container-x pt-8">
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Retour au catalogue
        </Link>
      </div>

      <section className="container-x py-10 grid gap-12 md:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-rose/30 to-emerald-soft/20 blur-2xl" />
          <img
            src={p.image}
            alt={p.name}
            width={1024}
            height={1024}
            className="relative rounded-2xl shadow-elegant w-full aspect-square object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-rose-deep">
            {p.type || "Produit"} · Réf. {p.ref}
          </p>
          <h1 className="mt-2 font-display text-5xl text-primary">{p.name}</h1>
          <p className="mt-4 text-3xl font-display">{formatFCFA(p.price)}</p>

          <p className="mt-6 text-foreground/80 leading-relaxed">{p.description}</p>

          <dl className="mt-7 grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-muted-foreground">{parfum ? "Contenance" : "Capacité"}</dt>
            <dd>{p.contenance}</dd>
            <dt className="text-muted-foreground">{parfum ? "Concentration" : "Type"}</dt>
            <dd>{p.concentration}</dd>
            <dt className="text-muted-foreground">Disponibilité</dt>
            <dd className="flex items-center gap-1.5">
              {p.available ? (
                <>
                  <Check className="h-4 w-4 text-whatsapp" /> En stock
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-destructive" /> Sur commande
                </>
              )}
            </dd>
          </dl>

          <div className="mt-8 rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-xl text-primary">
              {parfum ? "Pyramide olfactive" : "Caractéristiques"}
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <p>
                <span className="font-medium text-rose-deep">
                  {parfum ? "Notes de tête :" : "Points forts :"}
                </span>{" "}
                {p.notes.top.join(", ")}
              </p>
              <p>
                <span className="font-medium text-rose-deep">
                  {parfum ? "Notes de cœur :" : "Fonctionnalités :"}
                </span>{" "}
                {p.notes.heart.join(", ")}
              </p>
              <p>
                <span className="font-medium text-rose-deep">
                  {parfum ? "Notes de fond :" : "Idéal pour :"}
                </span>{" "}
                {p.notes.base.join(", ")}
              </p>
            </div>
          </div>

          <OrderWhatsAppButton
            product={{ name: p.name, ref: p.ref, price: p.price }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-medium text-white hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="h-5 w-5" /> Commander via WhatsApp
          </OrderWhatsAppButton>
          <p className="mt-3 text-xs italic text-muted-foreground">
            Aucun paiement en ligne. Modalités de paiement et de livraison convenues directement via
            WhatsApp Business.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-14">
          <h2 className="font-display text-3xl text-primary">Dans le même univers</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r: Product) => (
              <Link
                key={r.ref}
                to="/produit/$ref"
                params={{ ref: r.ref }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-elegant"
              >
                <div className="overflow-hidden aspect-square bg-muted">
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-primary">{r.name}</h3>
                  <p className="mt-1 text-sm">{formatFCFA(r.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
