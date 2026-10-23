"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CategoryFilterControls } from "@/components/category/category-filter-controls";
import type {
  FilterState,
  SetFilterState,
} from "@/components/category/category-types";

export function CategoryMobileFilterSheet({
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
  const [open, setOpen] = useState(false);

  function apply() {
    onApply();
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="mb-3 flex w-full justify-between rounded-xl px-4 lg:hidden"
          />
        }
      >
        <span>{t("filters_title")}</span>
        <SlidersHorizontal className="size-4" />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[90dvh] rounded-t-3xl border-border px-4 pb-0 pt-5 sm:px-6"
      >
        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <SheetTitle>{t("filters_title")}</SheetTitle>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("close_filters")}
            className="grid size-9 place-items-center rounded-full bg-muted text-foreground"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pb-5">
          <CategoryFilterControls
            filters={filters}
            setFilters={setFilters}
            currencySymbol={currencySymbol}
          />
        </div>
        <div className="sticky bottom-0 -mx-4 border-t border-border bg-background px-4 py-4 sm:-mx-6 sm:px-6">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClear}
              className="flex-1 rounded-full"
            >
              {t("clear_filters")}
            </Button>
            <Button
              type="button"
              onClick={apply}
              className="flex-1 rounded-full bg-black text-white hover:bg-neutral-800"
            >
              {t("apply_filters")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
