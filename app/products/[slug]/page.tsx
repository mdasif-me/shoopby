import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProductDetailSummary } from "@/components/products/product-detail-summary";
import { ProductFaqSection } from "@/components/products/product-faq-section";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductContentTabs } from "@/components/products/product-content-tabs";
import { ProductOverviewSection } from "@/components/products/product-overview-section";
import { ProductReviewsSection } from "@/components/products/product-reviews-section";
import { RelatedProductsSection } from "@/components/products/related-products-section";
import { getHomeProduct, homeProducts } from "@/lib/products/home-catalog";

const reviewKeys = [
  "review_1",
  "review_2",
  "review_3",
  "review_4",
  "review_5",
  "review_6",
  "review_7",
  "review_8",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getHomeProduct(slug);
  if (!product) notFound();

  const t = await getTranslations(`app.home.sections.${product.section}`);
  const details = await getTranslations("products.details");

  return {
    title: t(product.nameKey),
    description: details("product_description"),
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getHomeProduct(slug);
  if (!product) notFound();

  const t = await getTranslations("products.details");
  const productTranslations = await getTranslations(
    `app.home.sections.${product.section}`,
  );
  const navigation = await getTranslations("navigation");
  const currency = await getTranslations("app.platform");
  const productName = productTranslations(product.nameKey);
  const colors = [
    { name: t("color_olive"), value: "#514c35" },
    { name: t("color_teal"), value: "#315b56" },
    { name: t("color_navy"), value: "#30334e" },
  ];
  const sizes = [
    t("size_small"),
    t("size_medium"),
    t("size_large"),
    t("size_x_large"),
  ];
  const galleryImages = [
    product,
    ...homeProducts.filter(
      (item) => item.section === product.section && item.slug !== product.slug,
    ),
  ]
    .slice(0, 3)
    .map((item) => ({ src: item.image, alt: productName }));
  const reviews = reviewKeys.map((key, index) => ({
    name: t(`${key}.name`),
    quote: t(`${key}.quote`),
    date: t(`${key}.date`),
    rating: index === 1 || index === 5 ? 4 : 5,
    sortOrder: index,
  }));

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
      <section
        aria-label={productName}
        className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10"
      >
        <ProductGallery
          images={galleryImages}
          productName={productName}
          imageLabel={t("gallery_label")}
        />
        <ProductDetailSummary
          productName={productName}
          category={t("category_path")}
          rating={t("rating")}
          ratingLabel={t("rating_accessibility")}
          currencySymbol={currency("currency_symbol")}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          description={t("product_description")}
          colorsLabel={t("select_colors")}
          colors={colors}
          sizesLabel={t("choose_size")}
          sizes={sizes}
          quantityLabel={t("quantity")}
          decreaseLabel={t("decrease_quantity")}
          increaseLabel={t("increase_quantity")}
          addToCartLabel={t("add_to_cart")}
          breadcrumbLabels={{
            home: navigation("home"),
            shop: navigation("shop"),
            men: t("breadcrumb_men"),
            breadcrumb: t("breadcrumb_label"),
          }}
        />
      </section>

      <ProductContentTabs
        labels={{
          tabs: t("tabs_label"),
          details: t("tab_details"),
          reviews: t("tab_reviews"),
          faqs: t("tab_faqs"),
        }}
        details={
          <ProductOverviewSection
            title={t("tab_details")}
            productName={productName}
            description={t("product_description")}
            brandLabel={t("brand")}
            brand={t("brand_name")}
            categoryLabel={t("category")}
            category={t("category_path")}
            materialLabel={t("material")}
            material={t("material_value")}
            fitLabel={t("fit")}
            fit={t("fit_value")}
            careLabel={t("care")}
            care={t("care_value")}
          />
        }
        reviews={
          <ProductReviewsSection
            reviews={reviews}
            title={t("all_reviews_title")}
            countLabel={t("review_count_label")}
            latestLabel={t("latest")}
            highestRatedLabel={t("highest_rated")}
            lowestRatedLabel={t("lowest_rated")}
            allRatingsLabel={t("all_ratings")}
            fiveStarsLabel={t("five_stars")}
            fourStarsLabel={t("four_stars")}
            threeStarsLabel={t("three_stars")}
            writeReviewLabel={t("write_review")}
            loadMoreLabel={t("load_more_reviews")}
            verifiedLabel={t("verified_purchase")}
            ratingLabel={t("rating_label")}
            modalTitle={t("review_modal_title")}
            nameLabel={t("reviewer_name")}
            namePlaceholder={t("reviewer_name_placeholder")}
            commentLabel={t("your_review")}
            commentPlaceholder={t("review_placeholder")}
            submitLabel={t("submit_review")}
            cancelLabel={t("cancel_review")}
            previewNotice={t("review_preview_notice")}
          />
        }
        faqs={<ProductFaqSection />}
      />

      <RelatedProductsSection />
    </main>
  );
}
