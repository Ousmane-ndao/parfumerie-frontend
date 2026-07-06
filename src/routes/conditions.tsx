import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "Conditions de vente et livraison — Salaicha Parfumeur" },
      { name: "description", content: "Procédure de commande, modalités de paiement hors-ligne, zones et délais de livraison, retours et échanges." },
      { property: "og:title", content: "Conditions de vente et livraison — Salaicha Parfumeur" },
      { property: "og:description", content: "Toutes les conditions applicables à vos commandes Salaicha Parfumeur." },
    ],
  }),
  component: Conditions,
});

function Conditions() {
  return (
    <section className="container-x py-16">
      <p className="text-xs uppercase tracking-widest text-rose-deep">Informations légales</p>
      <h1 className="mt-2 font-display text-5xl text-primary">Conditions de vente & livraison</h1>

      <div className="mt-10 max-w-3xl space-y-10 text-foreground/85 leading-relaxed">
        <article>
          <h2 className="font-display text-2xl text-primary">1. Procédure de commande</h2>
          <p className="mt-2">
            Toute commande est passée via WhatsApp Business depuis ce site. Le client sélectionne un produit, clique sur « Commander via WhatsApp »,
            remplit le formulaire avec ses informations personnelles, puis envoie le message. Notre conseiller confirme ensuite la disponibilité,
            la livraison et le mode de paiement. Aucun paiement n'est traité sur ce site.
          </p>
        </article>

        <article>
          <h2 className="font-display text-2xl text-primary">2. Modalités de paiement</h2>
          <p className="mt-2">
            Les paiements sont effectués hors-ligne, après confirmation de la commande : Wave, Orange Money, Free Money,
            virement bancaire ou paiement en espèces à la livraison (selon la zone). Les coordonnées de paiement sont communiquées via WhatsApp.
          </p>
        </article>

        <article>
          <h2 className="font-display text-2xl text-primary">3. Délais et zones de livraison</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Dakar : 24 à 48 heures.</li>
            <li>Régions du Sénégal : 2 à 5 jours ouvrés.</li>
            <li>International : selon le transporteur (5 à 10 jours en moyenne).</li>
          </ul>
          <p className="mt-2">Les frais de livraison sont communiqués lors de la confirmation de commande.</p>
        </article>

        <article>
          <h2 className="font-display text-2xl text-primary">4. Retours et échanges</h2>
          <p className="mt-2">
            Pour des raisons d'hygiène, seuls les parfums non ouverts et scellés peuvent être retournés ou échangés,
            dans un délai de 7 jours après réception. Tout produit endommagé à la livraison doit nous être signalé sous 24h via WhatsApp.
          </p>
        </article>

        <article>
          <h2 className="font-display text-2xl text-primary">5. Avertissement</h2>
          <p className="mt-2 italic">
            Les commandes sont effectuées via WhatsApp Business. Aucun paiement en ligne n'est réalisé sur ce site.
            Les modalités de paiement et de livraison sont convenues directement avec l'entreprise.
          </p>
        </article>
      </div>
    </section>
  );
}
