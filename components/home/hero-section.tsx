import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function HeroSection() {
  const t = await getTranslations("app.home.hero");
  const stats = [
    { value: t("brands_count"), label: t("brands_label") },
    { value: t("products_count"), label: t("products_label") },
    { value: t("customers_count"), label: t("customers_label") },
  ];

  return (
    <section
      aria-labelledby="home-hero-title"
      className="mx-auto w-full max-w-360 pt-4 lg:pt-14"
    >
      <div className="relative flex flex-col overflow-hidden bg-background lg:h-150 lg:flex-row lg:gap-6 lg:rounded-3xl lg:bg-hero-outer-bg">
        <div className="order-2 flex w-full flex-col items-start bg-hero-card-bg px-5 pb-6 pt-2 shadow sm:p-8 lg:order-1 lg:m-8 lg:flex-1 lg:justify-center lg:rounded-2xl">
          <span className="rounded-full bg-hero-eyebrow-bg px-3 py-1.5 text-xs font-semibold tracking-widest text-hero-eyebrow-fg uppercase">
            {t("eyebrow")}
          </span>
          <h1
            id="home-hero-title"
            className="mt-4 max-w-md font-heading text-3xl leading-tight font-bold tracking-tight text-foreground uppercase lg:mt-8 lg:text-5xl"
          >
            {t("title")}
          </h1>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground lg:mt-6 lg:text-base">
            {t("description")}
          </p>
          <Link
            href={t("primary_action_href")}
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:mt-8 lg:w-auto lg:text-base"
          >
            {t("primary_action")}
          </Link>
        </div>

        <div className="relative order-1 flex w-full flex-col px-1.5 pt-4 lg:order-2 lg:h-full lg:min-w-0 lg:flex-1 lg:justify-center lg:p-6">
          <div className="mx-auto grid w-auto grid-cols-3 gap-3 px-3 pb-4 lg:absolute lg:inset-x-6 lg:bottom-15 lg:z-10 lg:max-w-lg lg:gap-2 lg:p-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 lg:flex-1 lg:rounded-2xl lg:bg-hero-card-bg lg:px-4 lg:py-4 lg:shadow-sm"
              >
                <p className="text-sm leading-none font-bold tracking-tight text-foreground sm:text-base lg:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground lg:mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <Image
            src="/image/Frame.svg"
            alt={t("image_alt")}
            width={358}
            height={399}
            className="block h-auto w-full max-w-full rounded-2xl object-contain lg:h-full lg:max-h-full lg:w-auto lg:self-center"
          />
        </div>
      </div>
    </section>
  );
}
