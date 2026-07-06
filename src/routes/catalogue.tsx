import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/catalog/CatalogView";
import { fetchProducts } from "@/lib/products-api";

export const Route = createFileRoute("/catalogue")({
  loader: async () => ({ products: await fetchProducts() }),
  head: () => ({
    meta: [
      { title: "Catalogue — Salaicha Parfumeur" },
      {
        name: "description",
        content: "Parfums, diffuseurs électriques et appareils Doppler — trois catégories distinctes.",
      },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  const { products } = Route.useLoaderData();
  return <CatalogView products={products} />;
}
