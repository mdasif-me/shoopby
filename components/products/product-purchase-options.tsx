"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type ColorOption = {
  name: string;
  value: string;
};

export function ProductPurchaseOptions({
  colors,
  colorsLabel,
  sizes,
  sizesLabel,
  quantityLabel,
  decreaseLabel,
  increaseLabel,
  addToCartLabel,
}: {
  colors: ColorOption[];
  colorsLabel: string;
  sizes: string[];
  sizesLabel: string;
  quantityLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  addToCartLabel: string;
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-5 divide-y divide-border border-y border-border">
      <fieldset className="py-4">
        <legend className="mb-3 text-sm text-muted-foreground">{colorsLabel}</legend>
        <div className="flex items-center gap-3">
          {colors.map((color, index) => (
            <button
              key={color.name}
              type="button"
              aria-label={color.name}
              aria-pressed={selectedColor === index}
              onClick={() => setSelectedColor(index)}
              className={`grid size-9 place-items-center rounded-full border-2 transition ${
                selectedColor === index
                  ? "border-background ring-1 ring-foreground"
                  : "border-transparent hover:ring-1 hover:ring-border"
              }`}
              style={{ backgroundColor: color.value }}
            >
              {selectedColor === index && (
                <span className="size-2 rounded-full bg-white shadow-sm" />
              )}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="py-4">
        <legend className="mb-3 text-sm text-muted-foreground">{sizesLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size, index) => (
            <button
              key={size}
              type="button"
              aria-pressed={selectedSize === index}
              onClick={() => setSelectedSize(index)}
              className={`min-w-16 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:min-w-20 sm:text-sm ${
                selectedSize === index
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 py-4 sm:flex-row">
        <div className="flex h-11 items-center justify-between rounded-full bg-muted px-3 sm:w-32">
          <button
            type="button"
            aria-label={decreaseLabel}
            disabled={quantity === 1}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="grid size-8 place-items-center rounded-full text-foreground transition-colors hover:bg-background disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <output aria-label={quantityLabel} className="min-w-6 text-center text-sm">
            {quantity}
          </output>
          <button
            type="button"
            aria-label={increaseLabel}
            onClick={() => setQuantity((current) => current + 1)}
            className="grid size-8 place-items-center rounded-full text-foreground transition-colors hover:bg-background"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <button
          type="button"
          className="h-11 flex-1 rounded-full bg-foreground px-6 py-3 md:py-0 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          {addToCartLabel}
        </button>
      </div>
    </div>
  );
}
