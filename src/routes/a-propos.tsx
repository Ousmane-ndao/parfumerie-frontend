import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Heart, Award } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Salaicha Parfumeur" },
      { name: "description", content: "Salaicha Parfumeur : notre histoire, notre mission et notre expertise unique en parfumerie sénégalaise de luxe." },
      { property: "og:title", content: "À propos — Salaicha Parfumeur" },
      { property: "og:description", content: "Découvrez l'histoire et les valeurs de la maison Salaicha Parfumeur." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden page-hero-gradient border-b border-border/60">
        <div className="container-x py-10 md:py-12 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-rose-deep">La maison</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl text-primary leading-tight">
              L'art du parfum, à la sénégalaise
            </h1>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              Salaicha Parfumeur est née d'une passion : célébrer la beauté des matières naturelles et offrir une parfumerie d'exception,
              ancrée dans l'élégance et la modernité africaine. Chaque fragrance est pensée comme un voyage sensoriel.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-rose/30 via-transparent to-emerald-soft/25 blur-2xl" />
            <div className="relative flex w-full items-center justify-center rounded-2xl border border-border/60 bg-card/90 px-8 py-10 md:px-12 md:py-14 shadow-elegant aspect-[16/11] md:aspect-[4/3]">
              <img
                src={logo}
                alt="Salaicha parfumeur"
                width={400}
                height={160}
                className="w-full max-w-[260px] md:max-w-[300px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16 grid gap-10 md:grid-cols-3">
        {[
          { icon: Heart, t: "Notre mission", d: "Démocratiser la parfumerie d'exception au Sénégal en proposant des fragrances raffinées, accessibles et porteuses d'identité." },
          { icon: Leaf, t: "Nos valeurs", d: "Authenticité, exigence et respect des matières premières. Nous travaillons avec des producteurs partenaires soigneusement choisis." },
          { icon: Award, t: "Notre expertise", d: "Plusieurs années de savoir-faire au service d'une parfumerie créative, à mi-chemin entre tradition orientale et modernité." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-2xl text-primary">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
      </section>

      <section className="container-x pb-20">
        <div className="rounded-3xl bg-emerald-deep text-cream p-10 md:p-14">
          <h2 className="font-display text-4xl text-rose">Notre histoire</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 text-cream/85 leading-relaxed">
            <p>
              De Dakar à l'Orient, Salaicha Parfumeur puise son inspiration dans les routes anciennes des matières précieuses : rose,
              oud, jasmin, vanille. Notre maison réunit le geste artisanal et l'exigence du sur-mesure.
            </p>
            <p>
              Chaque flacon est une invitation à l'évasion, pensé pour les femmes et les hommes qui souhaitent affirmer leur signature
              olfactive avec élégance. Le luxe, selon Salaicha, est intime, sensoriel et profondément humain.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
