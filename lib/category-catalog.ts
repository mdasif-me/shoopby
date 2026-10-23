import { homeProducts } from "@/lib/products/home-catalog";

export type ProductCategory =
  | "t-shirts"
  | "shirts"
  | "jeans"
  | "shorts";

export type ProductStyle = "casual" | "formal" | "party" | "gym";

export type CategoryProduct = (typeof homeProducts)[number] & {
  category: ProductCategory;
  colors: string[];
  sizes: string[];
  rating: number;
  styles: ProductStyle[];
};

type ProductMetadata = Pick<
  CategoryProduct,
  "category" | "colors" | "sizes" | "rating" | "styles"
>;

const productDetails: Record<string, ProductMetadata> = {
  "t-shirt-with-tape-details": {
    category: "t-shirts",
    colors: ["#ffffff", "#ec1494", "#f0ce00"],
    sizes: ["2xs", "xs"],
    rating: 4.5,
    styles: ["casual", "party"],
  },
  "skinny-fit-jeans": {
    category: "jeans",
    colors: ["#1748ec", "#111111"],
    sizes: ["s", "m"],
    rating: 3.5,
    styles: ["casual", "gym"],
  },
  "checkered-shirt": {
    category: "shirts",
    colors: ["#f00b18", "#ec1494"],
    sizes: ["xs", "m"],
    rating: 4.5,
    styles: ["casual", "formal"],
  },
  "sleeve-striped-t-shirt": {
    category: "t-shirts",
    colors: ["#f27800", "#111111"],
    sizes: ["l", "xl"],
    rating: 4.5,
    styles: ["casual", "gym"],
  },
  "vertical-striped-shirt": {
    category: "shirts",
    colors: ["#00b84a", "#f00b18"],
    sizes: ["xl", "2xl"],
    rating: 5,
    styles: ["casual", "formal"],
  },
  "courage-graphic-t-shirt": {
    category: "t-shirts",
    colors: ["#f27800", "#f0ce00", "#7614df", "#08b9d6"],
    sizes: ["s", "2xl"],
    rating: 4.5,
    styles: ["casual", "party"],
  },
  "loose-fit-bermuda-shorts": {
    category: "shorts",
    colors: ["#1748ec", "#00b84a"],
    sizes: ["2xs", "3xl"],
    rating: 3.5,
    styles: ["casual"],
  },
  "faded-skinny-jeans": {
    category: "jeans",
    colors: ["#ffffff"],
    sizes: ["3xl", "4xl"],
    rating: 5,
    styles: ["casual"],
  },
};

export const categoryProducts: CategoryProduct[] = homeProducts.map(
  (product) => ({
    ...product,
    ...productDetails[product.slug],
  }),
);
