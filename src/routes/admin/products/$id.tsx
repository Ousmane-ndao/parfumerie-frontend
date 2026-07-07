"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm, updateProductApi } from "@/components/admin/ProductForm";
import { normalizeProduct } from "@/lib/product-normalize";
import { adminFetch } from "@/lib/admin-client";
import type { ProductWithId } from "@/lib/product-input";

export const Route = createFileRoute("/admin/products/$id")({
  component: EditProductPage,
});

function EditProductPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductWithId | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Record<string, unknown>>(`/api/admin/products/${id}`)
      .then((data) => setProduct(normalizeProduct(data) as ProductWithId))
      .catch((e) => setError(e instanceof Error ? e.message : "Erreur"));
  }, [id]);

  if (error) {
    return (
      <AdminShell>
        <p className="text-destructive">{error}</p>
      </AdminShell>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminShell title={`Modifier ${product.ref}`}>
      <h1 className="mb-6 font-display text-3xl text-primary">Modifier — {product.name}</h1>
      <ProductForm
        initial={{
          ref: product.ref,
          name: product.name,
          type: product.type,
          family: product.family,
          price: product.price,
          image: product.image,
          short: product.short,
          description: product.description,
          notes: product.notes,
          contenance: product.contenance,
          concentration: product.concentration,
          available: product.available,
          featured: product.featured,
        }}
        submitLabel="Enregistrer"
        onSubmit={async (data) => {
          await updateProductApi(product.id, data);
          navigate({ to: "/admin" });
        }}
      />
    </AdminShell>
  );
}
