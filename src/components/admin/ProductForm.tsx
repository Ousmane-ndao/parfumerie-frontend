"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import type { ProductInput } from "@/lib/product-input";
import { perfumeFamilies, productTypes, type ProductType } from "@/lib/products";
import { adminFetch, adminUpload } from "@/lib/admin-client";
import { resolveMediaUrl } from "@/services/api";

export type ProductFormState = ProductInput;

const emptyForm = (): ProductFormState => ({
  ref: "",
  name: "",
  type: "Parfum",
  family: "Floral",
  price: 0,
  image: "",
  short: "",
  description: "",
  notes: { top: [], heart: [], base: [] },
  contenance: "100 ml",
  concentration: "Eau de Parfum",
  available: true,
  featured: false,
});

type ProductFormProps = {
  initial?: Partial<ProductFormState>;
  submitLabel: string;
  onSubmit: (data: ProductFormState) => Promise<void>;
};

export function ProductForm({ initial, submitLabel, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormState>({ ...emptyForm(), ...initial });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const isParfum = form.type === "Parfum";

  function setField<K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setNotes(key: keyof ProductFormState["notes"], value: string) {
    setForm((f) => ({
      ...f,
      notes: { ...f.notes, [key]: value.split(",").map((s) => s.trim()).filter(Boolean) },
    }));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");
    try {
      const url = await adminUpload(file);
      setField("image", url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload échoué");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6">
      {error && <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Référence *">
          <input
            required
            value={form.ref}
            onChange={(e) => setField("ref", e.target.value)}
            className="field-input"
            placeholder="SAL-ROSE-001"
          />
        </Field>
        <Field label="Nom *">
          <input required value={form.name} onChange={(e) => setField("name", e.target.value)} className="field-input" />
        </Field>
        <Field label="Catégorie *">
          <select
            value={form.type}
            onChange={(e) => setField("type", e.target.value as ProductType)}
            className="field-input"
          >
            {productTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        {isParfum && (
          <Field label="Famille olfactive *">
            <select
              value={form.family ?? "Floral"}
              onChange={(e) => setField("family", e.target.value as (typeof perfumeFamilies)[number])}
              className="field-input"
            >
              {perfumeFamilies.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Field>
        )}
        <Field label="Prix (FCFA) *">
          <input
            required
            type="number"
            min={0}
            value={form.price || ""}
            onChange={(e) => setField("price", Number(e.target.value))}
            className="field-input"
          />
        </Field>
        <Field label="Contenance *">
          <input required value={form.contenance} onChange={(e) => setField("contenance", e.target.value)} className="field-input" />
        </Field>
        <Field label="Concentration / Type *">
          <input required value={form.concentration} onChange={(e) => setField("concentration", e.target.value)} className="field-input" />
        </Field>
      </div>

      <Field label="Image *">
        <div className="flex flex-wrap items-center gap-3">
          <input
            required
            value={form.image}
            onChange={(e) => setField("image", e.target.value)}
            className="field-input flex-1 min-w-[200px]"
            placeholder="/uploads/products/..."
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Uploader
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleUpload(f);
              }}
            />
          </label>
        </div>
        {form.image && (
          <img src={resolveMediaUrl(form.image)} alt="" className="mt-2 h-24 w-24 rounded-lg border object-cover" />
        )}
      </Field>

      <Field label="Description courte *">
        <textarea required rows={2} value={form.short} onChange={(e) => setField("short", e.target.value)} className="field-input" />
      </Field>
      <Field label="Description complète *">
        <textarea required rows={5} value={form.description} onChange={(e) => setField("description", e.target.value)} className="field-input" />
      </Field>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label={isParfum ? "Notes de tête" : "Points forts"}>
          <input value={form.notes.top.join(", ")} onChange={(e) => setNotes("top", e.target.value)} className="field-input" placeholder="Séparées par des virgules" />
        </Field>
        <Field label={isParfum ? "Notes de cœur" : "Fonctionnalités"}>
          <input value={form.notes.heart.join(", ")} onChange={(e) => setNotes("heart", e.target.value)} className="field-input" />
        </Field>
        <Field label={isParfum ? "Notes de fond" : "Idéal pour"}>
          <input value={form.notes.base.join(", ")} onChange={(e) => setNotes("base", e.target.value)} className="field-input" />
        </Field>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.available} onChange={(e) => setField("available", e.target.checked)} />
          Disponible
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setField("featured", e.target.checked)} />
          Produit phare (accueil)
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitLabel}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

export async function createProductApi(data: ProductFormState) {
  return adminFetch("/api/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateProductApi(id: number, data: ProductFormState) {
  return adminFetch(`/api/admin/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
