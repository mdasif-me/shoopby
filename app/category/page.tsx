import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CategoryListing } from "@/components/category/category-listing";
import { categoryProducts } from "@/lib/category-catalog";

type SearchParams = Promise<{
  category?: string | string[];
  sort?: string | string[];
  q?: string | string[];
}>;

const categoryLabels = [
  "casual",
  "formal",
  "party",
  "gym",
  "men",
  "women",
  "t-shirts",
  "shirts",
  "jeans",
  "shorts",
  "hoodies",
  "kids",
  "shoes",
  "accessories",
  "electronics",
  "home",
  "beauty",
  "groceries",
  "sports",
  "streetwear",
  "weekend",
] as const;

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getSort(value: string | undefined) {
  switch (value?.toLowerCase()) {
    case "newest":
    case "newest_arrivals":
      return "newest";
    case "price_low_to_high":
    case "price-low-to-high":
      return "price-low-to-high";
    case "price_high_to_low":
    case "price-high-to-low":
      return "price-high-to-low";
    case "rating":
      return "rating";
    default:
      return "popular";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products.page");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const requestedCategory = getSingleParam(params.category)?.toLowerCase();
  const category =
    categoryLabels.find((value) => value === requestedCategory) ?? "casual";
  const categoryT = await getTranslations("products.category");
  const platform = await getTranslations("app.platform");

  const products = await Promise.all(
    categoryProducts.map(async (product) => {
      const productT = await getTranslations(
        `app.home.sections.${product.section}`,
      );

      return {
        ...product,
        name: productT(product.nameKey),
      };
    }),
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
      <CategoryListing
        products={products}
        category={category}
        title={categoryT(`title_${category}`)}
        currencySymbol={platform("currency_symbol")}
        sort={getSort(getSingleParam(params.sort))}
        query={getSingleParam(params.q) ?? ""}
      />
    </main>
  );
}
