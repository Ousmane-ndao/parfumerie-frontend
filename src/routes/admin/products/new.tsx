"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm, createProductApi } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/admin/products/new")({
  component: NewProductPage,
});

function NewProductPage() {
  const navigate = useNavigate();

  return (
    <AdminShell title="Nouveau produit">
      <h1 className="mb-6 font-display text-3xl text-primary">Ajouter un produit</h1>
      <ProductForm
        submitLabel="Créer le produit"
        onSubmit={async (data) => {
          await createProductApi(data);
          navigate({ to: "/admin" });
        }}
      />
    </AdminShell>
  );
}
