import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AutoSlider } from "@/components/home/auto-slider";

type Product = {
  image: string;
  nameKey:
    | "product_1_name"
    | "product_2_name"
    | "product_3_name"
    | "product_4_name";
  price: number;
  originalPrice?: number;
  discount?: string;
};

const products: Product[] = [
  {
    image: "/image/arrivals.svg",
    nameKey: "product_1_name",
    price: 120,
  },
  {
    image: "/image/arrivals-1.svg",
    nameKey: "product_2_name",
    price: 240,
    originalPrice: 260,
    discount: "-20%",
  },
  {
    image: "/image/arrivals-2.svg",
    nameKey: "product_3_name",
    price: 180,
  },
  {
    image: "/image/arrivals-3.svg",
    nameKey: "product_4_name",
    price: 130,
    originalPrice: 160,
    discount: "-30%",
  },
];

export async function NewArrivalsSection() {
  const t = await getTranslations("app.home.sections.new_arrivals");
  const currency = await getTranslations("app.platform");
  const productT = await getTranslations("products.card");
  const currencySymbol = currency("currency_symbol");
  const productCards = products.map((product) => {
    const name = t(product.nameKey);

    return (
      <article key={product.image} className="min-w-0">
        <Link
          href="/products?sort=newest"
          aria-label={name}
          className="block overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={product.image}
            alt={name}
            width={295}
            height={360}
            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 33vw, 25vw"
            className="h-auto w-full transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <h3 className="mt-3 truncate text-xs font-bold text-foreground uppercase sm:text-xl">
          {name}
        </h3>
        <div
          role="img"
          className="mt-1 flex items-center gap-1"
          aria-label={`${productT("rating_label")}: 5.0/5`}
        >
          <span className="text-lg leading-none tracking-tight text-amber-500">
            ★★★★★
          </span>
          <span className="text-sm text-muted-foreground">5.0/5</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-foreground sm:text-lg">
            {currencySymbol}
            {product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-md font-medium text-muted-foreground line-through">
                {currencySymbol}
                {product.originalPrice}
              </span>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-md font-medium text-rose-600">
                {product.discount}
              </span>
            </>
          )}
        </div>
      </article>
    );
  });

  return (
    <section
      aria-labelledby="new-arrivals-title"
      className="mx-auto w-full max-w-360 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2
            id="new-arrivals-title"
            className="font-heading text-2xl font-bold tracking-tight text-foreground uppercase sm:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-2 text-xs text-muted-foreground sm:text-base">
            {t("description")}
          </p>
        </div>
        <Link
          href="/products?sort=newest"
          className="shrink-0 rounded-full border border-border px-4 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted sm:px-5 sm:py-2.5"
        >
          {t("view_all_label")}
        </Link>
      </div>

      <AutoSlider items={productCards} label={t("title")} />
      <div className="hidden gap-x-4 gap-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
        {productCards}
      </div>
    </section>
  );
}
