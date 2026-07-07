import { formatFCFA } from "./products";

export type OrderInfo = {
  fullName: string;
  phone: string;
  quantity: string;
  city: string;
  neighborhood: string;
  address: string;
  paymentMethod: string;
  comments: string;
};

export const emptyOrderInfo = (): OrderInfo => ({
  fullName: "",
  phone: "",
  quantity: "1",
  city: "",
  neighborhood: "",
  address: "",
  paymentMethod: "",
  comments: "",
});

export const paymentMethods = [
  "Wave",
  "Orange Money",
  "Espèces",
  "Virement bancaire",
  "Autre",
] as const;

export function validateOrderInfo(info: OrderInfo): Partial<Record<keyof OrderInfo, string>> {
  const errors: Partial<Record<keyof OrderInfo, string>> = {};
  if (!info.fullName.trim()) errors.fullName = "Le nom et prénom sont obligatoires.";
  if (!info.phone.trim()) errors.phone = "Le téléphone est obligatoire.";
  else if (!/^[+\d\s()-]{8,}$/.test(info.phone.trim()))
    errors.phone = "Numéro de téléphone invalide.";
  if (!info.quantity.trim()) errors.quantity = "La quantité est obligatoire.";
  else if (!/^\d+$/.test(info.quantity.trim()) || Number(info.quantity) < 1) {
    errors.quantity = "Indiquez une quantité valide (minimum 1).";
  }
  if (!info.city.trim()) errors.city = "La ville est obligatoire.";
  if (!info.neighborhood.trim()) errors.neighborhood = "Le quartier est obligatoire.";
  if (!info.address.trim()) errors.address = "L'adresse ou le point de repère est obligatoire.";
  if (!info.paymentMethod.trim()) errors.paymentMethod = "Choisissez un mode de paiement.";
  return errors;
}

export function productOrderMessage(name: string, ref: string, price: number, info: OrderInfo) {
  const comments = info.comments.trim() || "—";
  return `Bonjour, je souhaite commander le produit suivant :

Produit : ${name}
Référence : ${ref}
Prix : ${formatFCFA(price)}

Mes informations :

Nom et prénom : ${info.fullName.trim()}
Téléphone : ${info.phone.trim()}
Quantité : ${info.quantity.trim()}
Ville : ${info.city.trim()}
Quartier : ${info.neighborhood.trim()}
Adresse ou point de repère : ${info.address.trim()}
Mode de paiement : ${info.paymentMethod}
Commentaires : ${comments}`;
}
