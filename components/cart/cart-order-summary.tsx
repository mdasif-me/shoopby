"use client";

import { Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { calculateCartTotals } from "@/lib/cart/cart-types";

export function CartOrderSummary({
  currencySymbol,
}: {
  currencySymbol: string;
}) {
  const t = useTranslations("cart");
  const {
    items,
    promoCode,
    applyPromoCode,
    clearPromoCode,
    clearDirectPurchase,
  } = useCart();
  const [promoInput, setPromoInput] = useState(promoCode ?? "");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoError, setPromoError] = useState(false);
  const totals = calculateCartTotals(items, promoCode);

  function handleApplyPromo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const applied = applyPromoCode(promoInput);
    setPromoError(!applied);
    setPromoMessage(applied ? t("promo_applied") : t("promo_invalid"));
    if (applied) setPromoInput("SAVE20");
  }

  function handleRemovePromo() {
    clearPromoCode();
    setPromoInput("");
    setPromoMessage(t("promo_removed"));
    setPromoError(false);
  }

  return (
    <aside className="h-fit rounded-2xl border border-border p-5 sm:p-6">
      <h2 className="text-lg font-bold text-foreground sm:text-xl">
        {t("order_summary")}
      </h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3 text-muted-foreground">
          <dt>{t("subtotal_label")}</dt>
          <dd className="font-semibold text-foreground">
            {currencySymbol}
            {totals.subtotal}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 text-muted-foreground">
          <dt>
            {t("discount_label")}
            {promoCode ? " (-20%)" : ""}
          </dt>
          <dd className="font-semibold text-rose-500">
            {totals.discount > 0 ? "-" : ""}
            {currencySymbol}
            {totals.discount}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 text-muted-foreground">
          <dt>{t("shipping_label")}</dt>
          <dd className="font-semibold text-foreground">
            {currencySymbol}
            {totals.shipping}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4 text-foreground">
          <dt>{t("total_label")}</dt>
          <dd className="text-lg font-bold">
            {currencySymbol}
            {totals.total}
          </dd>
        </div>
      </dl>

      <form onSubmit={handleApplyPromo} className="mt-4">
        <div className="flex gap-2">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-muted px-3">
            <Tag aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <span className="sr-only">{t("promo_placeholder")}</span>
            <input
              value={promoInput}
              onChange={(event) => {
                setPromoInput(event.target.value);
                setPromoMessage("");
                setPromoError(false);
              }}
              placeholder={t("promo_placeholder")}
              className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          {promoCode ? (
            <Button
              type="button"
              onClick={handleRemovePromo}
              className="h-10 rounded-full bg-black px-5 text-white hover:bg-neutral-800"
            >
              {t("remove_promo")}
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-10 rounded-full bg-black px-5 text-white hover:bg-neutral-800"
            >
              {t("apply_promo")}
            </Button>
          )}
        </div>
        <p
          aria-live="polite"
          className={`mt-2 min-h-4 text-xs ${promoError ? "text-rose-500" : "text-muted-foreground"}`}
        >
          {promoMessage || (promoCode ? t("promo_applied") : t("promo_hint"))}
        </p>
      </form>

      <Link
        href="/checkout"
        onClick={clearDirectPurchase}
        className={buttonVariants({
          className:
            "mt-3 h-11 w-full rounded-full bg-black text-white hover:bg-neutral-800",
        })}
      >
        {t("checkout")}
        <span aria-hidden="true" className="ms-1 text-lg">
          →
        </span>
      </Link>
    </aside>
  );
}
