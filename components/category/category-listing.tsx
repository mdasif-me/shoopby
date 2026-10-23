"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryFilterPanel } from "@/components/category/category-filter-panel";
import { CategoryMobileFilterSheet } from "@/components/category/category-mobile-filter-sheet";
import { CategoryPagination } from "@/components/category/category-pagination";
import { CategoryProductCard } from "@/components/category/category-product-card";
import { CategorySortControl } from "@/components/category/category-sort-control";
import {
  createInitialFilters,
  type FilterState,
  type ProductCardData,
  type SortOrder,
} from "@/components/category/category-types";

type CategoryListingProps = {
  products: ProductCardData[];
  category: string;
  title: string;
  currencySymbol: string;
  homeLabel: string;
  sort: SortOrder;
};

const pageSize = 9;

export function CategoryListing({
  products,
  category,
  title,
  currencySymbol,
  homeLabel,
  sort: initialSort,
}: CategoryListingProps) {
  const t = useTranslations("products.category");
  const [draftFilters, setDraftFilters] = useState(() =>
    createInitialFilters(category),
  );
  const [activeFilters, setActiveFilters] = useState(() =>
    createInitialFilters(category),
  );
  const [sort, setSort] = useState<SortOrder>(initialSort);
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      const inCategories =
        activeFilters.categories.length === 0 ||
        activeFilters.categories.includes(product.category);
      const inColors =
        activeFilters.colors.length === 0 ||
        activeFilters.colors.some((color) => product.colors.includes(color));
      const inSizes =
        activeFilters.sizes.length === 0 ||
        activeFilters.sizes.some((size) => product.sizes.includes(size));
      const inStyles =
        activeFilters.styles.length === 0 ||
        activeFilters.styles.some((style) => product.styles.includes(style));
      const inPrice =
        product.price >= activeFilters.minPrice &&
        product.price <= activeFilters.maxPrice;

      return inCategories && inColors && inSizes && inStyles && inPrice;
    });

    switch (sort) {
      case "newest":
        return matches.sort((a, b) =>
          a.section === b.section
            ? 0
            : a.section === "new_arrivals"
              ? -1
              : 1,
        );
      case "price-low-to-high":
        return matches.sort((a, b) => a.price - b.price);
      case "price-high-to-low":
        return matches.sort((a, b) => b.price - a.price);
      case "rating":
        return matches.sort((a, b) => b.rating - a.rating);
      default:
        return matches;
    }
  }, [products, activeFilters, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const firstProduct =
    filteredProducts.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastProduct = Math.min(page * pageSize, filteredProducts.length);

  function applyFilters() {
    setActiveFilters(draftFilters);
    setPage(1);
  }

  function clearFilters() {
    const cleared: FilterState = {
      categories: [],
      colors: [],
      sizes: [],
      styles: [],
      minPrice: 0,
      maxPrice: 300,
    };
    setDraftFilters(cleared);
    setActiveFilters(cleared);
    setPage(1);
  }

  function changeSort(nextSort: SortOrder) {
    setSort(nextSort);
    setPage(1);
  }

  return (
    <>
      <nav
        aria-label={t("breadcrumb_label")}
        className="mb-5 flex items-center gap-2 text-xs text-muted-foreground sm:mb-7 sm:text-sm"
      >
        <Link href="/" className="transition-colors hover:text-foreground">
          {homeLabel}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-7">
        <CategoryFilterPanel
          filters={draftFilters}
          setFilters={setDraftFilters}
          currencySymbol={currencySymbol}
          onApply={applyFilters}
          onClear={clearFilters}
        />

        <section aria-labelledby="category-title" className="min-w-0">
          <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
            <div>
              <h1
                id="category-title"
                className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                {title}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground sm:hidden">
                {t("showing_products", {
                  from: firstProduct,
                  to: lastProduct,
                  count: filteredProducts.length,
                })}
              </p>
            </div>
            <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
              <span>
                {t("showing_products", {
                  from: firstProduct,
                  to: lastProduct,
                  count: filteredProducts.length,
                })}
              </span>
              <CategorySortControl sort={sort} onChange={changeSort} />
            </div>
          </div>

          <div className="lg:hidden">
            <CategoryMobileFilterSheet
              filters={draftFilters}
              setFilters={setDraftFilters}
              currencySymbol={currencySymbol}
              onApply={applyFilters}
              onClear={clearFilters}
            />
          </div>

          <div className="mb-4 sm:hidden">
            <CategorySortControl
              sort={sort}
              onChange={changeSort}
              compact
            />
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <CategoryProductCard
                  key={product.slug}
                  product={product}
                  currencySymbol={currencySymbol}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-5 py-12 text-center">
              <h2 className="font-semibold text-foreground">
                {t("empty_title")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("empty_description")}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="mt-5 rounded-full"
              >
                {t("clear_filters")}
              </Button>
            </div>
          )}

          <CategoryPagination
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        </section>
      </div>
    </>
  );
}
