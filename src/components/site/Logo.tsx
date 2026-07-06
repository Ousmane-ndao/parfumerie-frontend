import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

type LogoProps = {
  variant?: "default" | "footer";
  onClick?: () => void;
};

export function Logo({ variant = "default", onClick }: LogoProps) {
  const isFooter = variant === "footer";
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex items-center"
      aria-label="Salaicha Parfumeur — Accueil"
    >
      <img
        src={logo}
        alt="Salaicha parfumeur"
        width={180}
        height={72}
        className={`w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 ${
          isFooter ? "h-12 rounded-lg bg-white px-3 py-1" : "h-11 md:h-12"
        }`}
      />
    </Link>
  );
}
