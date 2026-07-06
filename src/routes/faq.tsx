import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import faqPromo from "@/assets/faq-whatsapp-promo.png";
import { FaqList, flattenFaqsForSchema, faqGroups } from "@/components/site/FaqList";
import { whatsappLink } from "@/lib/whatsapp";

const schemaFaqs = flattenFaqsForSchema(faqGroups);

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Salaicha Parfumeur" },
      {
        name: "description",
        content:
          "Foire aux questions : commande, paiement, livraison, retours et échanges chez Salaicha Parfumeur.",
      },
      { property: "og:title", content: "FAQ — Salaicha Parfumeur" },
      {
        property: "og:description",
        content: "Toutes les réponses aux questions fréquentes sur nos services.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: schemaFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <section className="container-x py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-rose-deep">Foire aux questions</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl text-primary leading-tight">
            Questions fréquentes
          </h1>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            Vous ne trouvez pas la réponse à votre question ? Contactez-nous directement sur WhatsApp
            Business.
          </p>
          <a
            href={whatsappLink("Bonjour, j'ai une question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Nous écrire sur WhatsApp
          </a>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <img
            src={faqPromo}
            alt="Salaicha Parfumeur — conseil olfactif et discussion WhatsApp"
            width={1200}
            height={675}
            className="w-full max-w-lg rounded-2xl shadow-elegant object-cover"
          />
        </div>
      </div>

      <FaqList />
    </section>
  );
}
