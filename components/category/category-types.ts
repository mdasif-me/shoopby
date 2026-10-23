import type { Dispatch, SetStateAction } from "react";
import type {
  CategoryProduct,
  ProductCategory,
  ProductStyle,
} from "@/lib/category-catalog";

export type ProductCardData = CategoryProduct & { name: string };

export type SortOrder =
  | "popular"
  | "newest"
  | "price-low-to-high"
  | "price-high-to-low"
  | "rating";

export type FilterState = {
  categories: ProductCategory[];
  colors: string[];
  sizes: string[];
  styles: ProductStyle[];
  minPrice: number;
  maxPrice: number;
};

export type SetFilterState = Dispatch<SetStateAction<FilterState>>;

export const categoryOptions: ProductCategory[] = [
  "t-shirts",
  "shorts",
  "shirts",
  "jeans",
];

const styleOptions: ProductStyle[] = ["casual", "formal", "party", "gym"];

export function createInitialFilters(category: string): FilterState {
  const knownCategory = categoryOptions.includes(category as ProductCategory);
  const knownStyle = styleOptions.includes(
    category as (typeof styleOptions)[number],
  );

  return {
    categories: knownCategory ? [category as ProductCategory] : [],
    colors: [],
    sizes: [],
    styles: knownStyle ? [category as ProductStyle] : [],
    minPrice: 50,
    maxPrice: 300,
  };
}

export function toggleValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}
