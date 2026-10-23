"use client";

import Image from "next/image";
import { useState } from "react";

export type ProductImage = {
  src: string;
  alt: string;
};

export function ProductGallery({
  images,
  productName,
  imageLabel,
}: {
  images: ProductImage[];
  productName: string;
  imageLabel: string;
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="grid gap-3 sm:gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted sm:rounded-3xl">
        <Image
          src={images[activeImage].src}
          alt={images[activeImage].alt || productName}
          fill
          preload
          sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 42vw"
          className="object-contain"
        />
      </div>

      <div
        role="group"
        aria-label={imageLabel}
        className="flex gap-3 overflow-x-auto sm:gap-4"
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`${imageLabel} ${index + 1}`}
            aria-pressed={activeImage === index}
            onClick={() => setActiveImage(index)}
            className={`relative aspect-square w-[calc((100%_-_1.5rem)/3)] max-w-28 shrink-0 overflow-hidden rounded-xl bg-muted transition-colors sm:rounded-2xl ${
              activeImage === index
                ? "border border-foreground"
                : "border border-transparent hover:border-border"
            }`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="96px"
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
