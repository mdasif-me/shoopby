"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ProductCardData } from "@/components/category/category-types";

export function CategoryProductCard({
  product,
  currencySymbol,
}: {
  product: ProductCardData;
  currencySymbol: string;
}) {
  const t = useTranslations("products.category");

  return (
    <article className="min-w-0">
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="group block overflow-hidden rounded-2xl bg-muted"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={295}
          height={360}
          sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 23vw"
          className="aspect-[0.82] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <h2 className="mt-2 min-h-9 text-xs font-bold leading-4 text-foreground sm:text-sm sm:leading-5">
        <Link href={`/products/${product.slug}`} className="hover:underline">
          {product.name}
        </Link>
      </h2>
      <div
        role="img"
        aria-label={t("rating_accessibility", { rating: product.rating })}
        className="mt-1 flex items-center gap-1"
      >
        <span
          aria-hidden="true"
          className="text-xs tracking-tight text-amber-500 sm:text-sm"
        >
          ★★★★★
        </span>
        <span className="text-[10px] text-foreground">
          {product.rating.toFixed(1)}/5
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
}
