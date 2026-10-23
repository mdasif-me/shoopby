"use client";

import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CategoryFilterControls } from "@/components/category/category-filter-controls";
import type {
  FilterState,
  SetFilterState,
} from "@/components/category/category-types";

export function CategoryFilterPanel({
  filters,
  setFilters,
  currencySymbol,
  onApply,
  onClear,
}: {
  filters: FilterState;
  setFilters: SetFilterState;
  currencySymbol: string;
  onApply: () => void;
  onClear: () => void;
}) {
  const t = useTranslations("products.category");

  return (
    <aside className="hidden h-fit rounded-2xl border border-border p-5 lg:block">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          {t("filters_title")}
        </h2>
        <SlidersHorizontal aria-hidden="true" className="size-4" />
      </div>
      <CategoryFilterControls
        filters={filters}
        setFilters={setFilters}
        currencySymbol={currencySymbol}
      />
      <div className="mt-5 space-y-2">
        <Button
          type="button"
          onClick={onApply}
          className="w-full rounded-full bg-black text-white hover:bg-neutral-800"
        >
          {t("apply_filters")}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onClear}
          className="w-full rounded-full"
        >
          {t("clear_filters")}
        </Button>
      </div>
    </aside>
  );
}
