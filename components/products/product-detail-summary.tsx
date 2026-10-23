import { ProductPurchaseOptions } from "@/components/products/product-purchase-options";

type ProductColor = {
  name: string;
  value: string;
};

export function ProductDetailSummary({
  cartProduct,
  productName,
  rating,
  ratingLabel,
  currencySymbol,
  price,
  originalPrice,
  discount,
  description,
  colorsLabel,
  colors,
  sizesLabel,
  sizes,
  quantityLabel,
  decreaseLabel,
  increaseLabel,
  addToCartLabel,
  addedToCartLabel,
  buyNowLabel,
  selectionUnavailableLabel,
}: {
  cartProduct: {
    slug: string;
    name: string;
    image: string;
    price: number;
  };
  productName: string;
  rating: string;
  ratingLabel: string;
  currencySymbol: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  description: string;
  colorsLabel: string;
  colors: ProductColor[];
  sizesLabel: string;
  sizes: string[];
  quantityLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  addToCartLabel: string;
  addedToCartLabel: string;
  buyNowLabel: string;
  selectionUnavailableLabel: string;
}) {
  return (
    <div>
      <h1 className="font-heading text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {productName}
      </h1>

      <div className="mt-3 flex items-center gap-2">
        <div
          role="img"
          aria-label={ratingLabel}
          className="flex gap-0.5 text-lg leading-none text-amber-500"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index === 4 ? "opacity-50" : ""}>
              ★
            </span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{rating}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <span className="text-xl font-bold text-foreground sm:text-2xl">
          {currencySymbol}
          {price}
        </span>
        {originalPrice && (
          <span className="text-base font-medium text-muted-foreground line-through sm:text-lg">
            {currencySymbol}
            {originalPrice}
          </span>
        )}
        {discount && (
          <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-600">
            {discount}
          </span>
        )}
      </div>

      <p
        id="product-description"
        className="mt-3 text-sm leading-relaxed text-muted-foreground"
      >
        {description}
      </p>

      <ProductPurchaseOptions
        product={cartProduct}
        colors={colors}
        sizes={sizes}
        colorsLabel={colorsLabel}
        sizesLabel={sizesLabel}
        quantityLabel={quantityLabel}
        decreaseLabel={decreaseLabel}
        increaseLabel={increaseLabel}
        addToCartLabel={addToCartLabel}
        addedToCartLabel={addedToCartLabel}
        buyNowLabel={buyNowLabel}
        selectionUnavailableLabel={selectionUnavailableLabel}
      />
    </div>
  );
}
