"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { CartOrderSummary } from "@/components/cart/cart-order-summary";
import { CartProductRow } from "@/components/cart/cart-product-row";
import { useCart } from "@/components/cart/cart-provider";

export function CartView({
  currencySymbol,
}: {
  currencySymbol: string;
}) {
  const t = useTranslations("cart");
  const { items, clearCart, isReady } = useCart();

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
        </div>
        {items.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={clearCart}
            className="text-xs text-muted-foreground"
          >
            {t("clear_cart")}
          </Button>
        )}
      </div>

      {!isReady ? (
        <div
          role="status"
          className="rounded-2xl border border-border px-5 py-14 text-center text-sm text-muted-foreground"
        >
          {t("loading")}
        </div>
      ) : items.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-border px-5 py-14 text-center">
          <h2 className="text-lg font-semibold text-foreground">
            {t("empty_title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {t("empty_description")}
          </p>
          <Link
            href="/category"
            className={buttonVariants({
              className:
                "mt-5 rounded-full bg-black px-6 text-white hover:bg-neutral-800",
            })}
          >
            {t("continue_shopping")}
          </Link>
        </section>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
          <section
            aria-label={t("items_label", { count: items.length })}
            className="rounded-2xl border border-border px-4 sm:px-5"
          >
            {items.map((item) => (
              <CartProductRow
                key={item.key}
                item={item}
                currencySymbol={currencySymbol}
              />
            ))}
          </section>
          <CartOrderSummary currencySymbol={currencySymbol} />
        </div>
      )}
    </main>
  );
}
