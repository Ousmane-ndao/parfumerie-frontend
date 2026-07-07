import type { LucideIcon } from "lucide-react";
import { Package, ShieldCheck, Truck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqEntry = {
  id: string;
  q: string;
  intro?: string;
  bullets?: string[];
  note?: string;
};

export type FaqGroup = {
  title: string;
  icon: LucideIcon;
  items: FaqEntry[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Commande",
    icon: Package,
    items: [
      {
        id: "commande",
        q: "Comment passer commande ?",
        intro:
          "La commande se fait en quelques étapes simples, entièrement via WhatsApp Business :",
        bullets: [
          "Parcourez le catalogue et ouvrez la fiche du produit souhaité.",
          "Cliquez sur « Commander via WhatsApp » et remplissez le formulaire (nom, téléphone, adresse, quantité).",
          "Envoyez le message pré-rempli sur WhatsApp — notre équipe confirme disponibilité, livraison et paiement avec vous.",
        ],
        note: "Aucun paiement en ligne n'est effectué sur ce site.",
      },
    ],
  },
  {
    title: "Paiement & livraison",
    icon: Truck,
    items: [
      {
        id: "paiement",
        q: "Quels moyens de paiement acceptez-vous ?",
        intro: "Les modalités sont convenues lors de votre échange WhatsApp. Nous acceptons :",
        bullets: [
          "Wave",
          "Orange Money",
          "Free Money",
          "Espèces à la livraison (selon zone)",
          "Virement bancaire",
        ],
      },
      {
        id: "livraison-zones",
        q: "Effectuez-vous des livraisons hors de Dakar ?",
        intro: "Oui, nous couvons l'ensemble du territoire :",
        bullets: [
          "Livraison partout au Sénégal",
          "Expédition internationale sur demande",
          "Frais et délais précisés via WhatsApp selon votre adresse",
        ],
      },
      {
        id: "delais",
        q: "Quels sont les délais de livraison ?",
        bullets: [
          "Dakar : 24 à 48 h",
          "Régions : 2 à 5 jours ouvrés",
          "International : 5 à 10 jours selon le transporteur",
        ],
        note: "Les délais exacts vous sont confirmés lors de la validation de commande.",
      },
    ],
  },
  {
    title: "Produits & qualité",
    icon: ShieldCheck,
    items: [
      {
        id: "retours",
        q: "Puis-je retourner ou échanger un parfum ?",
        intro: "Pour des raisons d'hygiène, les retours sont acceptés uniquement si :",
        bullets: [
          "Le produit n'a pas été ouvert",
          "L'emballage d'origine est scellé et intact",
          "La demande est faite dans les 7 jours suivant la réception",
        ],
        note: "Signalez tout produit endommagé à la livraison sous 24 h via WhatsApp.",
      },
      {
        id: "authenticite",
        q: "Vos parfums sont-ils authentiques ?",
        intro: "Oui, toutes nos fragrances sont 100 % authentiques.",
        bullets: [
          "Matières premières soigneusement sélectionnées",
          "Contrôle qualité avant chaque livraison",
          "Conseil personnalisé pour trouver votre signature olfactive",
        ],
      },
    ],
  },
];

export function flattenFaqsForSchema(groups: FaqGroup[]) {
  return groups.flatMap((g) =>
    g.items.map((item) => ({
      q: item.q,
      a: [item.intro, ...(item.bullets ?? []), item.note].filter(Boolean).join(" "),
    })),
  );
}

function FaqAnswer({ item }: { item: FaqEntry }) {
  return (
    <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
      {item.intro && <p>{item.intro}</p>}
      {item.bullets && item.bullets.length > 0 && (
        <ul className="space-y-2 rounded-xl bg-muted/40 px-4 py-3">
          {item.bullets.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-deep" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}
      {item.note && (
        <p className="rounded-lg border-l-2 border-rose/40 bg-rose/5 px-3 py-2 text-xs text-muted-foreground italic">
          {item.note}
        </p>
      )}
    </div>
  );
}

export function FaqList() {
  return (
    <div className="mt-14 border-t border-border/60 pt-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-deep font-medium">
          Réponses détaillées
        </p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">
          Tout ce qu'il faut savoir
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Commande, paiement, livraison et qualité — organisé par thème pour vous guider rapidement.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
        {faqGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.title}
              className="rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-soft"
            >
              <div className="mb-4 flex items-center gap-3 border-b border-border/60 pb-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl md:text-2xl text-primary">{group.title}</h3>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {group.items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-border/50 px-0 last:border-b-0"
                  >
                    <AccordionTrigger className="font-display text-base text-primary hover:no-underline py-3.5 [&>svg]:text-rose-deep">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0">
                      <FaqAnswer item={item} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}
