"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function CategoryPagination({
  page,
  pageCount,
  setPage,
}: {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
}) {
  const t = useTranslations("products.category");

  return (
    <nav
      aria-label={t("pagination_label")}
      className="mt-8 flex items-center justify-between border-t border-border pt-4 sm:mt-10"
    >
      <Button
        type="button"
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage(Math.max(1, page - 1))}
        className="h-8 rounded-lg px-2.5 text-xs sm:px-3"
      >
        <ArrowLeft className="size-3.5" />
        <span className="hidden sm:inline">{t("previous_page")}</span>
        <span className="sm:hidden">{t("previous_short")}</span>
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-current={pageNumber === page ? "page" : undefined}
              onClick={() => setPage(pageNumber)}
              className="size-8 rounded-lg text-xs text-muted-foreground transition-colors hover:bg-muted aria-[current=page]:bg-muted aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        disabled={page === pageCount}
        onClick={() => setPage(Math.min(pageCount, page + 1))}
        className="h-8 rounded-lg px-2.5 text-xs sm:px-3"
      >
        <span className="hidden sm:inline">{t("next_page")}</span>
        <span className="sm:hidden">{t("next_short")}</span>
        <ArrowRight className="size-3.5" />
      </Button>
    </nav>
  );
}
