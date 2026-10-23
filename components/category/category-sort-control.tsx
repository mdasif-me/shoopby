"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SortOrder } from "@/components/category/category-types";

const sortOptionKeys: {
  key: SortOrder;
  label: "popular" | "newest" | "price_low_to_high" | "price_high_to_low" | "rating";
}[] = [
  { key: "popular", label: "popular" },
  { key: "newest", label: "newest" },
  { key: "price-low-to-high", label: "price_low_to_high" },
  { key: "price-high-to-low", label: "price_high_to_low" },
  { key: "rating", label: "rating" },
];

export function CategorySortControl({
  sort,
  onChange,
  compact = false,
}: {
  sort: SortOrder;
  onChange: (sort: SortOrder) => void;
  compact?: boolean;
}) {
  const t = useTranslations("products.category");
  const sortT = useTranslations("products.sort_options");
  const selectedSort =
    sortOptionKeys.find((option) => option.key === sort) ?? sortOptionKeys[0];

  return (
    <div className={`flex items-center gap-1 ${compact ? "justify-between sm:hidden" : ""}`}>
      <span className="text-xs text-muted-foreground">{t("sort_label")}</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`inline-flex items-center gap-1 font-medium text-foreground outline-none ${
            compact
              ? "max-w-[70%] truncate text-xs"
              : "hidden text-xs sm:inline-flex"
          }`}
        >
          {sortT(selectedSort.label)}
          <ChevronDown className="size-3.5 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptionKeys.map((option) => (
            <DropdownMenuItem
              key={option.key}
              onClick={() => onChange(option.key)}
            >
              {sortT(option.label)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
