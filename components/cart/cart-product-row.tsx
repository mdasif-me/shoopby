"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/lib/cart/cart-types";

export function CartProductRow({
  item,
  currencySymbol,
}: {
  item: CartItem;
  currencySymbol: string;
}) {
  const t = useTranslations("cart");
  const { setQuantity, removeItem } = useCart();

  return (
    <article className="flex gap-3 border-b border-border py-4 last:border-b-0 sm:gap-4 sm:py-5">
      <Link
        href={`/products/${item.slug}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-28"
        aria-label={item.name}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="line-clamp-2 text-sm font-bold text-foreground sm:text-base">
              {item.name}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("size")}: {item.size}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {t("color")}: <span>{item.colorName}</span>
              <span
                aria-hidden="true"
                className="size-3 rounded-full border border-black/10"
                style={{ backgroundColor: item.colorValue }}
              />
            </p>
          </div>
          <button
            type="button"
            aria-label={t("remove_item", { name: item.name })}
            onClick={() => removeItem(item.key)}
            className="grid size-8 shrink-0 place-items-center rounded-full text-rose-500 transition-colors hover:bg-rose-50"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="text-base font-bold text-foreground sm:text-lg">
            {currencySymbol}
            {item.price}
          </p>
          <div
            aria-label={t("quantity")}
            className="flex h-8 items-center gap-1 rounded-full bg-muted px-1 sm:h-9"
          >
            <button
              type="button"
              aria-label={t("decrease_quantity", { name: item.name })}
              disabled={item.quantity <= 1}
              onClick={() => setQuantity(item.key, item.quantity - 1)}
              className="grid size-7 place-items-center rounded-full text-foreground transition-colors hover:bg-background disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <output className="min-w-5 text-center text-xs font-medium">
              {item.quantity}
            </output>
            <button
              type="button"
              aria-label={t("increase_quantity", { name: item.name })}
              onClick={() => setQuantity(item.key, item.quantity + 1)}
              className="grid size-7 place-items-center rounded-full text-foreground transition-colors hover:bg-background"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
