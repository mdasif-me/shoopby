"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export type ProductReview = {
  name: string;
  quote: string;
  date: string;
  rating: number;
  sortOrder: number;
};

export function ProductReviewsSection({
  reviews,
  title,
  countLabel,
  latestLabel,
  highestRatedLabel,
  lowestRatedLabel,
  allRatingsLabel,
  fiveStarsLabel,
  fourStarsLabel,
  threeStarsLabel,
  writeReviewLabel,
  loadMoreLabel,
  verifiedLabel,
  ratingLabel,
  modalTitle,
  nameLabel,
  namePlaceholder,
  commentLabel,
  commentPlaceholder,
  submitLabel,
  cancelLabel,
  previewNotice,
}: {
  reviews: ProductReview[];
  title: string;
  countLabel: string;
  latestLabel: string;
  highestRatedLabel: string;
  lowestRatedLabel: string;
  allRatingsLabel: string;
  fiveStarsLabel: string;
  fourStarsLabel: string;
  threeStarsLabel: string;
  writeReviewLabel: string;
  loadMoreLabel: string;
  verifiedLabel: string;
  ratingLabel: string;
  modalTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  commentLabel: string;
  commentPlaceholder: string;
  submitLabel: string;
  cancelLabel: string;
  previewNotice: string;
}) {
  const [sort, setSort] = useState("latest");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [submittedReviews, setSubmittedReviews] = useState<ProductReview[]>([]);
  const sortedReviews = useMemo(
    () => {
      const filtered = [...submittedReviews, ...reviews].filter(
        (review) =>
          ratingFilter === "all" || review.rating === Number(ratingFilter),
      );
      return filtered.sort((first, second) => {
        if (sort === "highest") return second.rating - first.rating;
        if (sort === "lowest") return first.rating - second.rating;
        return second.sortOrder - first.sortOrder;
      });
    },
    [ratingFilter, reviews, sort, submittedReviews],
  );

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const quote = String(formData.get("review") ?? "").trim();
    if (!name || !quote) return;

    setSubmittedReviews((current) => [
      {
        name,
        quote,
        rating: selectedRating,
        date: new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
        }).format(new Date()),
        sortOrder: Date.now(),
      },
      ...current,
    ]);
    setSort("latest");
    setRatingFilter("all");
    setShowMore(true);
    setIsReviewDialogOpen(false);
    form.reset();
    setSelectedRating(5);
  }

  return (
    <section aria-labelledby="product-reviews-title" className="py-5 sm:py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="product-reviews-title" className="text-lg font-bold sm:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">{countLabel}</p>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label={title}
                  className="grid size-10 place-items-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              <SlidersHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl p-1.5">
              <DropdownMenuRadioGroup
                value={ratingFilter}
                onValueChange={(value) => setRatingFilter(value ?? "all")}
              >
                <DropdownMenuRadioItem value="all">
                  {allRatingsLabel}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="5">
                  {fiveStarsLabel}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="4">
                  {fourStarsLabel}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3">
                  {threeStarsLabel}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="inline-flex h-10 min-w-28 items-center justify-between gap-3 rounded-full bg-muted px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              {sort === "highest"
                ? highestRatedLabel
                : sort === "lowest"
                  ? lowestRatedLabel
                  : latestLabel}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl p-1.5">
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(value) => setSort(value ?? "latest")}
              >
                <DropdownMenuRadioItem value="latest">
                  {latestLabel}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="highest">
                  {highestRatedLabel}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="lowest">
                  {lowestRatedLabel}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog.Root
            open={isReviewDialogOpen}
            onOpenChange={setIsReviewDialogOpen}
          >
            <Dialog.Trigger
              render={
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-85"
                />
              }
            >
              {writeReviewLabel}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
              <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-border bg-background p-5 text-foreground shadow-2xl outline-none transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="text-lg font-bold sm:text-xl">
                      {modalTitle}
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                      {previewNotice}
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    aria-label={cancelLabel}
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/70"
                  >
                    <X className="size-4" />
                  </Dialog.Close>
                </div>

                <form onSubmit={submitReview} className="mt-6 space-y-5">
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium">
                      {ratingLabel}
                    </legend>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, index) => {
                        const rating = index + 1;
                        return (
                          <button
                            key={rating}
                            type="button"
                            aria-label={`${rating} / 5`}
                            aria-pressed={selectedRating === rating}
                            onClick={() => setSelectedRating(rating)}
                            className="rounded-md p-1 text-amber-500 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <Star
                              className={`size-6 ${
                                rating <= selectedRating ? "fill-current" : ""
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <label className="block space-y-2 text-sm font-medium">
                    {nameLabel}
                    <Input
                      name="name"
                      required
                      maxLength={80}
                      placeholder={namePlaceholder}
                      className="h-11 rounded-xl"
                    />
                  </label>

                  <label className="block space-y-2 text-sm font-medium">
                    {commentLabel}
                    <textarea
                      name="review"
                      required
                      minLength={5}
                      maxLength={1000}
                      rows={5}
                      placeholder={commentPlaceholder}
                      className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>

                  <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Dialog.Close
                      className="h-11 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      {cancelLabel}
                    </Dialog.Close>
                    <button
                      type="submit"
                      className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-85"
                    >
                      {submitLabel}
                    </button>
                  </div>
                </form>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
        {sortedReviews.map((review, index) => (
          <article
            key={review.name}
            className={`rounded-2xl border border-border bg-background p-4 sm:p-5 ${
              index >= 6 && !showMore
                ? "hidden"
                : index >= 3 && !showMore
                  ? "hidden sm:block"
                  : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div
                role="img"
                aria-label={`${ratingLabel}: ${review.rating} / 5`}
                className="flex gap-0.5 text-lg leading-none text-amber-500"
              >
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`size-4 ${
                      starIndex < review.rating
                        ? "fill-current"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span aria-hidden="true" className="text-muted-foreground">
                ···
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-foreground">
                {review.name}
              </h3>
              <BadgeCheck
                aria-label={verifiedLabel}
                className="size-4 fill-green-600 text-white"
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              “{review.quote}”
            </p>
            <p className="mt-4 text-[11px] text-muted-foreground">
              {review.date}
            </p>
          </article>
        ))}
      </div>

      {sortedReviews.length > 3 && !showMore && (
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className="mt-4 h-10 w-full rounded-full border border-border text-xs font-medium text-foreground transition-colors hover:bg-muted sm:w-40"
        >
          {loadMoreLabel}
        </button>
      )}
      {submittedReviews.length > 0 && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Check className="size-4 text-green-600" />
          {previewNotice}
        </p>
      )}
    </section>
  );
}
