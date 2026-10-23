import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { homeProducts } from "@/lib/products/home-catalog";

export async function RelatedProductsSection() {
  const t = await getTranslations("app.home.sections.top_selling");
  const details = await getTranslations("products.details");
  const productT = await getTranslations("products.card");
  const currency = await getTranslations("app.platform");
  const currencySymbol = currency("currency_symbol");
  const recommendations = homeProducts.filter(
    (product) => product.section === "top_selling",
  );

  return (
    <section aria-labelledby="related-products-title" className="py-10 sm:py-14">
      <h2
        id="related-products-title"
        className="mb-5 text-center font-heading text-2xl font-bold tracking-tight text-foreground sm:mb-8 sm:text-3xl"
      >
        {details("related_title")}
      </h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {recommendations.map((product) => {
          const name = t(product.nameKey);

          return (
            <article key={product.image} className="min-w-0">
              <Link
                href={`/products/${product.slug}`}
                aria-label={name}
                className="block overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={product.image}
                  alt={name}
                  width={295}
                  height={360}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 25vw"
                  className="h-auto w-full"
                />
              </Link>
              <h3 className="mt-2 truncate text-xs font-bold text-foreground sm:text-sm">
                {name}
              </h3>
              <div
                role="img"
                aria-label={`${productT("rating_label")}: 4.5 / 5`}
                className="mt-1 flex items-center gap-1"
              >
                <span aria-hidden="true" className="text-sm tracking-tight text-amber-500">
                  ★★★★★
                </span>
                <span className="text-[10px] text-muted-foreground">
                  4.5/5
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-sm font-bold text-foreground sm:text-base">
                  {currencySymbol}
                  {product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xs text-muted-foreground line-through">
                      {currencySymbol}
                      {product.originalPrice}
                    </span>
                    <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-medium text-rose-600">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
