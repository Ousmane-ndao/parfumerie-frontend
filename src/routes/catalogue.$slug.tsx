import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CatalogView } from "@/components/catalog/CatalogView";
import { getCategoryBySlug } from "@/lib/catalog";
import { fetchProducts } from "@/lib/products-api";

export const Route = createFileRoute("/catalogue/$slug")({
  loader: async ({ params }) => {
    const category = getCategoryBySlug(params.slug);
    if (!category) throw notFound();
    const products = await fetchProducts();
    return { category, products };
  },
  head: ({ loaderData }) => {
    const cat = loaderData?.category;
    return {
      meta: [
        { title: cat ? `${cat.label} — Salaicha Parfumeur` : "Catégorie — Salaicha Parfumeur" },
        { name: "description", content: cat?.description ?? "" },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-4xl text-primary">Catégorie introuvable</h1>
      <Link to="/catalogue" className="mt-6 inline-block text-primary hover:underline">
        ← Retour au catalogue
      </Link>
    </div>
  ),
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  return <CatalogView fixedCategory={category} products={products} />;
}
