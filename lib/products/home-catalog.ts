export type HomeProduct = {
  slug: string;
  section: "new_arrivals" | "top_selling";
  nameKey:
    | "product_1_name"
    | "product_2_name"
    | "product_3_name"
    | "product_4_name";
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
};

export const homeProducts: HomeProduct[] = [
  {
    slug: "t-shirt-with-tape-details",
    section: "new_arrivals",
    nameKey: "product_1_name",
    image: "/image/arrivals.svg",
    price: 120,
  },
  {
    slug: "skinny-fit-jeans",
    section: "new_arrivals",
    nameKey: "product_2_name",
    image: "/image/arrivals-1.svg",
    price: 240,
    originalPrice: 260,
    discount: "-20%",
  },
  {
    slug: "checkered-shirt",
    section: "new_arrivals",
    nameKey: "product_3_name",
    image: "/image/arrivals-2.svg",
    price: 180,
  },
  {
    slug: "sleeve-striped-t-shirt",
    section: "new_arrivals",
    nameKey: "product_4_name",
    image: "/image/arrivals-3.svg",
    price: 130,
    originalPrice: 160,
    discount: "-30%",
  },
  {
    slug: "vertical-striped-shirt",
    section: "top_selling",
    nameKey: "product_1_name",
    image: "/image/top-selling.svg",
    price: 212,
    originalPrice: 232,
    discount: "-20%",
  },
  {
    slug: "courage-graphic-t-shirt",
    section: "top_selling",
    nameKey: "product_2_name",
    image: "/image/top-selling-1.svg",
    price: 145,
  },
  {
    slug: "loose-fit-bermuda-shorts",
    section: "top_selling",
    nameKey: "product_3_name",
    image: "/image/top-selling-2.svg",
    price: 80,
  },
  {
    slug: "faded-skinny-jeans",
    section: "top_selling",
    nameKey: "product_4_name",
    image: "/image/top-selling-3.svg",
    price: 210,
  },
];

export function getHomeProduct(slug: string) {
  return homeProducts.find((product) => product.slug === slug);
}
