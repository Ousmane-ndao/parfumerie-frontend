import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Salaicha Parfumeur" },
      {
        name: "description",
        content: `Contactez Salaicha Parfumeur à ${site.address}. WhatsApp Business, e-mail et horaires d'ouverture.`,
      },
      { property: "og:title", content: "Contact — Salaicha Parfumeur" },
      {
        property: "og:description",
        content: "Tous les moyens de nous joindre : WhatsApp, e-mail, adresse et horaires.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="container-x py-16">
      <p className="text-xs uppercase tracking-widest text-rose-deep">Nous joindre</p>
      <h1 className="mt-2 font-display text-5xl text-primary">Contactez-nous</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        Notre équipe est à votre écoute pour toute question sur nos parfums, votre commande ou la
        livraison. La voie la plus rapide reste WhatsApp Business.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            {
              icon: MessageCircle,
              label: "WhatsApp Business",
              value: site.phoneDisplay,
              href: whatsappLink("Bonjour, je vous contacte depuis votre site."),
            },
            {
              icon: Phone,
              label: "Téléphone",
              value: site.phoneDisplay,
              href: `tel:+${site.whatsapp}`,
            },
            { icon: Mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
            { icon: MapPin, label: "Adresse", value: site.address },
            { icon: Clock, label: "Horaires", value: site.hours },
          ].map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="font-medium">{value}</p>
                )}
              </div>
            </div>
          ))}

          <a
            href={whatsappLink("Bonjour, je souhaite passer commande.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 font-medium text-white hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" /> Démarrer la conversation
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card aspect-square md:aspect-auto md:min-h-[500px]">
          <iframe
            title="Carte Salaicha Parfumeur"
            src="https://www.google.com/maps?q=Dakar%2C%20Senegal&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
