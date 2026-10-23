"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  categoryOptions,
  toggleValue,
  type FilterState,
  type SetFilterState,
} from "@/components/category/category-types";
import type { ProductStyle } from "@/lib/category-catalog";

const colorOptions = [
  { value: "#00b84a", key: "green" },
  { value: "#f00b18", key: "red" },
  { value: "#f0ce00", key: "yellow" },
  { value: "#f27800", key: "orange" },
  { value: "#08b9d6", key: "cyan" },
  { value: "#1748ec", key: "blue" },
  { value: "#7614df", key: "purple" },
  { value: "#ec1494", key: "pink" },
  { value: "#ffffff", key: "white" },
  { value: "#111111", key: "black" },
] as const;

const sizeOptions = [
  "xs",
  "2xs",
  "s",
  "m",
  "l",
  "xl",
  "2xl",
  "3xl",
  "4xl",
] as const;
const styleOptions: ProductStyle[] = ["casual", "formal", "party", "gym"];

export function CategoryFilterControls({
  filters,
  setFilters,
  currencySymbol,
}: {
  filters: FilterState;
  setFilters: SetFilterState;
  currencySymbol: string;
}) {
  const t = useTranslations("products.category");

  return (
    <div className="space-y-5">
      <details open className="group border-b border-border pb-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground">
          {t("filter_category")}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 space-y-1">
          {categoryOptions.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filters.categories.includes(category)}
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  categories: toggleValue(current.categories, category),
                }))
              }
              className="flex w-full items-center justify-between py-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:font-medium aria-pressed:text-foreground"
            >
              {t(`category_${category}`)}
              <ChevronRight className="size-4" />
            </button>
          ))}
        </div>
      </details>

      <details open className="group border-b border-border pb-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground">
          {t("filter_price")}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-4 space-y-3">
          <label className="block text-xs text-muted-foreground">
            {t("minimum_price")}: {currencySymbol}
            {filters.minPrice}
            <input
              type="range"
              min={0}
              max={250}
              step={10}
              value={filters.minPrice}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  minPrice: Math.min(
                    Number(event.target.value),
                    current.maxPrice,
                  ),
                }))
              }
              className="mt-2 block w-full accent-foreground"
            />
          </label>
          <label className="block text-xs text-muted-foreground">
            {t("maximum_price")}: {currencySymbol}
            {filters.maxPrice}
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={filters.maxPrice}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  maxPrice: Math.max(
                    Number(event.target.value),
                    current.minPrice,
                  ),
                }))
              }
              className="mt-2 block w-full accent-foreground"
            />
          </label>
        </div>
      </details>

      <details open className="group border-b border-border pb-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground">
          {t("filter_colors")}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {colorOptions.map(({ value, key }) => {
            const selected = filters.colors.includes(value);

            return (
              <button
                key={key}
                type="button"
                aria-label={t(`color_${key}`)}
                aria-pressed={selected}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    colors: toggleValue(current.colors, value),
                  }))
                }
                className="grid size-7 place-items-center rounded-full border border-black/10 transition-transform hover:scale-110 aria-pressed:ring-2 aria-pressed:ring-foreground aria-pressed:ring-offset-2"
                style={{ backgroundColor: value }}
              >
                {selected && (
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full ${key === "white" ? "bg-black" : "bg-white"}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </details>

      <details open className="group border-b border-border pb-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground">
          {t("filter_size")}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={filters.sizes.includes(size)}
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  sizes: toggleValue(current.sizes, size),
                }))
              }
              className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-foreground hover:text-background aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {t(`size_${size}`)}
            </button>
          ))}
        </div>
      </details>

      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground">
          {t("filter_style")}
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 space-y-1">
          {styleOptions.map((style) => (
            <button
              key={style}
              type="button"
              aria-pressed={filters.styles.includes(style)}
              onClick={() =>
                setFilters((current) => ({
                  ...current,
                  styles: toggleValue(current.styles, style),
                }))
              }
              className="flex w-full items-center justify-between py-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground aria-pressed:font-medium aria-pressed:text-foreground"
            >
              {t(`style_${style}`)}
              <ChevronRight className="size-4" />
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
