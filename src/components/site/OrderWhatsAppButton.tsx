"use client";

import { useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatFCFA } from "@/lib/products";
import {
  emptyOrderInfo,
  paymentMethods,
  productOrderMessage,
  validateOrderInfo,
  type OrderInfo,
} from "@/lib/order-form";
import { whatsappLink } from "@/lib/whatsapp";

type Product = {
  name: string;
  ref: string;
  price: number;
};

type OrderWhatsAppButtonProps = {
  product: Product;
  className?: string;
  children?: ReactNode;
};

const defaultClassName =
  "flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity";

export function OrderWhatsAppButton({ product, className, children }: OrderWhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<OrderInfo>(emptyOrderInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderInfo, string>>>({});

  function updateField<K extends keyof OrderInfo>(key: K, value: OrderInfo[K]) {
    setInfo((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validateOrderInfo(info);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    const message = productOrderMessage(product.name, product.ref, product.price, info);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setOpen(false);
    setInfo(emptyOrderInfo());
    setErrors({});
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setErrors({});
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className ?? defaultClassName}>
        {children ?? (
          <>
            <MessageCircle className="h-4 w-4" /> Commander via WhatsApp
          </>
        )}
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-primary">Finaliser votre commande</DialogTitle>
            <DialogDescription>
              Renseignez vos informations avant d&apos;envoyer la commande sur WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm">
            <p className="font-medium text-primary">{product.name}</p>
            <p className="mt-1 text-muted-foreground">Réf. {product.ref}</p>
            <p className="mt-2 font-display text-lg">{formatFCFA(product.price)}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nom et prénom *" error={errors.fullName}>
              <Input
                value={info.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Ex. Aminata Diop"
                autoComplete="name"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Téléphone *" error={errors.phone}>
                <Input
                  type="tel"
                  value={info.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="Ex. 77 123 45 67"
                  autoComplete="tel"
                />
              </Field>
              <Field label="Quantité *" error={errors.quantity}>
                <Input
                  type="number"
                  min={1}
                  value={info.quantity}
                  onChange={(e) => updateField("quantity", e.target.value)}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ville *" error={errors.city}>
                <Input
                  value={info.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="Ex. Dakar"
                />
              </Field>
              <Field label="Quartier *" error={errors.neighborhood}>
                <Input
                  value={info.neighborhood}
                  onChange={(e) => updateField("neighborhood", e.target.value)}
                  placeholder="Ex. Almadies"
                />
              </Field>
            </div>

            <Field label="Adresse ou point de repère *" error={errors.address}>
              <Input
                value={info.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Rue, immeuble, repère…"
              />
            </Field>

            <Field label="Mode de paiement *" error={errors.paymentMethod}>
              <select
                value={info.paymentMethod}
                onChange={(e) => updateField("paymentMethod", e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Choisir…</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Commentaires" error={errors.comments}>
              <Textarea
                value={info.comments}
                onChange={(e) => updateField("comments", e.target.value)}
                placeholder="Instructions de livraison, préférences… (facultatif)"
                rows={3}
              />
            </Field>

            <DialogFooter className="gap-2 sm:gap-0">
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-4 w-4" />
                Envoyer sur WhatsApp
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
