"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Loader2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { resolveMediaUrl } from "@/services/api";
import { adminFetch } from "@/lib/admin-client";
import type { ProductWithId } from "@/lib/product-input";
import { formatFCFA } from "@/lib/products";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<ProductWithId[]>("/api/admin/products");
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur chargement");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function remove(id: number, name: string) {
    if (!confirm(`Supprimer « ${name} » ?`)) return;
    await adminFetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts((p) => p.filter((x) => x.id !== id));
  }

  async function importJson(file: File) {
    setImporting(true);
    setError("");
    try {
      const text = await file.text();
      const data = JSON.parse(text) as unknown;
      if (!Array.isArray(data)) throw new Error("Le fichier doit contenir un tableau JSON");
      await adminFetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Import échoué");
    } finally {
      setImporting(false);
    }
  }

  const byType = (type: string) => products.filter((p) => p.type === type);

  return (
    <AdminShell title="Catalogue produits">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-primary">Produits</h1>
          <p className="text-sm text-muted-foreground">{products.length} produit(s) en base</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
            {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Importer JSON
            <input
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importJson(f);
              }}
            />
          </label>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Nouveau produit
          </Link>
        </div>
      </div>

      {error && <p className="mb-4 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="text-muted-foreground">Aucun produit. Ajoutez-en un ou lancez le script de seed.</p>
          <code className="mt-3 block text-xs text-muted-foreground">npm run db:seed</code>
        </div>
      ) : (
        <div className="space-y-8">
          {(["Parfum", "Diffuseur électrique", "Appareil Doppler"] as const).map((type) => {
            const items = byType(type);
            if (items.length === 0) return null;
            return (
              <section key={type}>
                <h2 className="mb-3 font-display text-xl text-primary">
                  {type} <span className="text-sm font-normal text-muted-foreground">({items.length})</span>
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Réf.</th>
                        <th className="px-4 py-3">Nom</th>
                        <th className="px-4 py-3">Prix</th>
                        <th className="px-4 py-3">Statut</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((p) => (
                        <tr key={p.id} className="border-b border-border/60 last:border-0">
                          <td className="px-4 py-3">
                            <img src={resolveMediaUrl(p.image)} alt="" className="h-10 w-10 rounded object-cover" />
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">{p.ref}</td>
                          <td className="px-4 py-3">{p.name}</td>
                          <td className="px-4 py-3">{formatFCFA(p.price)}</td>
                          <td className="px-4 py-3">
                            {p.available ? (
                              <span className="text-whatsapp">Disponible</span>
                            ) : (
                              <span className="text-muted-foreground">Indisponible</span>
                            )}
                            {p.featured && <span className="ml-2 text-xs text-rose-deep">★ Phare</span>}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <Link
                                to="/admin/products/$id"
                                params={{ id: String(p.id) }}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 hover:bg-muted"
                              >
                                <Pencil className="h-3.5 w-3.5" /> Modifier
                              </Link>
                              <button
                                type="button"
                                onClick={() => void remove(p.id, p.name)}
                                className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 px-2 py-1 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Suppr.
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
