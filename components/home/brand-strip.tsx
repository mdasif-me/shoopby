import Image from "next/image";

const brands = [
  { name: "Versace", image: "/brand-image/versace.svg", width: 110, height: 36 },
  { name: "Zara", image: "/brand-image/zara.svg", width: 91, height: 38 },
  { name: "Gucci", image: "/brand-image/gucci.svg", width: 156, height: 36 },
  { name: "Prada", image: "/brand-image/prada.svg", width: 194, height: 32 },
  {
    name: "Calvin Klein",
    image: "/brand-image/calvin-klein.svg",
    width: 132,
    height: 36,
  },
] as const;

export function BrandStrip() {
  return (
    <div className="w-full overflow-hidden bg-brand-strip-bg py-4 lg:py-6">
      <div className="brand-marquee-track flex w-max items-center lg:w-full lg:justify-between">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className={`flex shrink-0 items-center gap-8 px-4 lg:gap-6 lg:px-16 ${copy === 1 ? "lg:hidden" : "lg:flex-1 lg:justify-between"}`}
          >
            {brands.map((brand) => (
              <span
                key={`${copy}-${brand.name}`}
                className="flex h-10 w-32 shrink-0 items-center justify-center lg:flex-1"
              >
                <Image
                  src={brand.image}
                  alt={copy === 0 ? brand.name : ""}
                  aria-hidden={copy === 1}
                  width={brand.width}
                  height={brand.height}
                  className="h-8 w-auto max-w-full object-contain sm:h-9"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
