import { BadgeCheck } from "lucide-react";
import { AutoSlider } from "@/components/home/auto-slider";

type Review = {
  key: string;
  name: string;
  quote: string;
};

export function CustomerReviewCarousel({
  reviews,
  carouselLabel,
  ratingLabel,
  verifiedLabel,
}: {
  reviews: Review[];
  carouselLabel: string;
  ratingLabel: string;
  verifiedLabel: string;
}) {
  const reviewCards = reviews.map((review) => (
    <article
      key={review.key}
      className="flex min-h-48 flex-col rounded-2xl border border-border bg-background p-3"
    >
      <div
        role="img"
        aria-label={ratingLabel}
        className="flex gap-1 text-sm leading-none text-amber-500"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>★</span>
        ))}
      </div>
      <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
        “{review.quote}”
      </p>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="font-heading text-sm font-bold text-foreground">
          {review.name}
        </span>
        <BadgeCheck
          aria-label={verifiedLabel}
          className="size-4 fill-green-600 text-white"
        />
      </div>
    </article>
  ));

  return <AutoSlider items={reviewCards} label={carouselLabel} />;
}
