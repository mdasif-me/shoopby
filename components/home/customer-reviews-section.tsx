import { BadgeCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CustomerReviewCarousel } from "@/components/home/customer-review-carousel";

const reviews = [
  { key: "review_1", name: "Sarah M." },
  { key: "review_2", name: "Alex K." },
  { key: "review_3", name: "James L." },
  { key: "review_4", name: "Priya R." },
] as const;

export async function CustomerReviewsSection() {
  const t = await getTranslations("app.home.sections.customer_reviews");
  const carouselReviews = reviews.map((review) => ({
    ...review,
    quote: t(`${review.key}.quote`),
  }));

  return (
    <section
      aria-labelledby="customer-reviews-title"
      className="mx-auto w-full max-w-360 px-2 py-8 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mb-6">
        <h2
          id="customer-reviews-title"
          className="font-heading text-xl leading-tight font-bold tracking-tight text-foreground uppercase sm:text-5xl"
        >
          {t("title")}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-base">
          {t("description")}
        </p>
      </div>

      <CustomerReviewCarousel
        reviews={carouselReviews}
        carouselLabel={t("title")}
        ratingLabel={t("rating_label")}
        verifiedLabel={t("verified_label")}
      />

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {reviews.map((review) => (
          <article
            key={review.key}
            className="flex h-full flex-col rounded-3xl border border-border bg-background p-6"
          >
            <div
              role="img"
              aria-label={t("rating_label")}
              className="flex gap-1 text-2xl leading-none text-amber-500"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>★</span>
              ))}
            </div>
            <p className="mt-5 flex-1 text-base leading-relaxed text-muted-foreground">
              “{t(`${review.key}.quote`)}”
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="font-heading text-lg font-bold text-foreground">
                {review.name}
              </span>
              <BadgeCheck
                aria-label={t("verified_label")}
                className="size-5 fill-green-600 text-white"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
