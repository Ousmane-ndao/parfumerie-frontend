import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type HeroProductOrbitProps = {
  products: Product[];
  className?: string;
};

function pickImages(products: Product[], limit = 8): string[] {
  const featured = products.filter((p) => p.featured);
  const pool = featured.length >= 4 ? featured : products;
  const seen = new Set<string>();
  const images: string[] = [];
  for (const p of pool) {
    if (!p.image || seen.has(p.image)) continue;
    seen.add(p.image);
    images.push(p.image);
    if (images.length >= limit) break;
  }
  return images;
}

export function HeroProductOrbit({ products, className }: HeroProductOrbitProps) {
  const images = pickImages(products);
  const count = images.length;

  if (count < 3) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className,
      )}
      aria-hidden
    >
      <div className="relative h-[280px] w-[280px] md:h-[340px] md:w-[340px] [--orbit-r:118px] md:[--orbit-r:148px]">
        <div className="absolute inset-[6%] rounded-full border border-dashed border-rose/30" />
        <div className="absolute inset-[16%] rounded-full bg-gradient-to-br from-rose/10 via-transparent to-emerald-soft/10" />

        <div className="absolute inset-0 animate-orbit-spin">
          {images.map((src, i) => {
            const angle = (360 / count) * i;
            return (
              <div
                key={src}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-r)))`,
                }}
              >
                <div className="animate-orbit-spin-reverse -ml-7 -mt-7 md:-ml-8 md:-mt-8">
                  <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-card bg-card shadow-elegant md:h-16 md:w-16">
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-[26%] rounded-full bg-gradient-to-tr from-rose/25 via-transparent to-emerald-soft/20 blur-2xl" />
      </div>
    </div>
  );
}

/** @deprecated Alias — fond circulaire produits */
export const HeroProductMarquee = HeroProductOrbit;
