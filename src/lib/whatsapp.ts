import { site } from "./site-config";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export type { OrderInfo } from "./order-form";
export {
  emptyOrderInfo,
  paymentMethods,
  productOrderMessage,
  validateOrderInfo,
} from "./order-form";
