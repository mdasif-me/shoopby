"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const circleClass =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-colors hover:bg-neutral-50 lg:size-12 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900";

export function CartPreview() {
  const t = useTranslations("cart");
  const platform = useTranslations("app.platform");
  const { items, itemCount } = useCart();
  const previewItems = items.slice(0, 3);
  const remainingItems = items.length - previewItems.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={t("open_cart_preview")}
            className={cn(circleClass, "relative")}
          />
        }
      >
        <ShoppingCart className="size-5" strokeWidth={1.75} />
        {itemCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -end-1 -top-1 grid min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] leading-5 text-white"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl p-3"
      >
        <div className="flex items-center justify-between px-2 pb-2">
          <h2 className="text-sm font-semibold text-foreground">
            {t("preview_title")}
          </h2>
          <span className="text-xs text-muted-foreground">
            {t("items_label", { count: itemCount })}
          </span>
        </div>

        {previewItems.length > 0 ? (
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {previewItems.map((item) => (
              <li key={item.key}>
                <DropdownMenuItem
                  render={<Link href={`/products/${item.slug}`} />}
                  className="h-auto gap-3 whitespace-normal rounded-xl p-2"
                >
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block line-clamp-1 text-xs font-semibold text-foreground">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[11px] text-muted-foreground">
                      {item.size} · {item.colorName} · {t("quantity")}{" "}
                      {item.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-foreground">
                    {platform("currency_symbol")}
                    {item.price}
                  </span>
                </DropdownMenuItem>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-2 py-5 text-center text-sm text-muted-foreground">
            {t("preview_empty")}
          </p>
        )}

        {remainingItems > 0 && (
          <p className="px-2 pt-1 text-xs text-muted-foreground">
            {t("more_items", { count: remainingItems })}
          </p>
        )}

        <DropdownMenuItem
          render={<Link href="/cart" />}
          className={cn(
            buttonVariants({
              className:
                "mt-2 h-10 w-full rounded-full bg-black px-4 text-white hover:bg-neutral-800 focus:bg-black focus:text-white",
            }),
            "justify-center",
          )}
        >
          {t("view_cart")}
          <ArrowRight className="ms-1 size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
