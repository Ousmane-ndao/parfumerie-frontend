import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { catalogCategories } from "@/lib/catalog";
import { site } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 bg-emerald-deep text-cream">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="footer" />
          <p className="mt-4 max-w-md text-sm text-cream/80 leading-relaxed">
            Maison de parfumerie inspirée de l'élégance de la rose et de l'esprit du naturel.
            Découvrez nos fragrances et commandez directement via WhatsApp Business.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={site.socials.facebook} aria-label="Facebook" className="rounded-full border border-cream/30 p-2.5 hover:bg-cream/10 transition-colors"><Facebook className="h-4 w-4" /></a>
            <a href={site.socials.instagram} aria-label="Instagram" className="rounded-full border border-cream/30 p-2.5 hover:bg-cream/10 transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href={site.socials.linkedin} aria-label="LinkedIn" className="rounded-full border border-cream/30 p-2.5 hover:bg-cream/10 transition-colors"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg text-rose">Navigation</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li><Link to="/catalogue" className="hover:text-rose transition-colors">Catalogue</Link></li>
            {catalogCategories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to="/catalogue/$slug"
                  params={{ slug: cat.slug }}
                  className="hover:text-rose transition-colors"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
            <li><Link to="/a-propos" className="hover:text-rose transition-colors">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-rose transition-colors">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-rose transition-colors">FAQ</Link></li>
            <li><Link to="/conditions" className="hover:text-rose transition-colors">Conditions & Livraison</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg text-rose">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {site.address}</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /> {site.hours}</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> <a href={`mailto:${site.email}`} className="hover:text-rose transition-colors">{site.email}</a></li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
                WhatsApp Business
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-x py-5 text-xs text-cream/70 flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Tous droits réservés.</p>
          <p className="italic">Les commandes sont effectuées via WhatsApp Business. Aucun paiement en ligne n'est réalisé sur ce site.</p>
        </div>
      </div>
    </footer>
  );
}
