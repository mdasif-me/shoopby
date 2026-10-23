import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AutoSlider } from "@/components/home/auto-slider";

const styles = [
  {
    key: "casual",
    image: "/image/arrivals.svg",
  },
  {
    key: "formal",
    image: "/image/top-selling.svg",
  },
  {
    key: "party",
    image: "/image/arrivals-3.svg",
  },
  {
    key: "gym",
    image: "/image/top-selling-1.svg",
  },
  {
    key: "streetwear",
    image: "/image/arrivals-1.svg",
  },
  {
    key: "weekend",
    image: "/image/top-selling-2.svg",
  },
] as const;

export async function DressStyleSection() {
  const t = await getTranslations("app.home.sections.dress_style");
  const styleCards = styles.map((style) => (
    <Link
      key={style.key}
      href={`/products?category=${style.key}`}
      className="group relative isolate flex aspect-square items-end overflow-hidden rounded-2xl bg-background p-3 text-foreground shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md sm:rounded-3xl sm:p-4"
    >
      <Image
        src={style.image}
        alt=""
        fill
        sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 33vw, 33vw"
        className="-z-10 object-contain object-center p-3 sm:p-5"
      />
      <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-background/90 px-3 py-2 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:px-4 sm:py-3">
        <span className="truncate text-sm font-bold sm:text-2xl">
          {t(style.key)}
        </span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 hover:scale-125 hover:rotate-12">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  ));

  return (
    <section
      aria-labelledby="dress-style-title"
      className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl bg-muted p-5 sm:p-8 lg:p-10">
        <div className="mb-6">
          <h2
            id="dress-style-title"
            className="font-heading text-2xl font-bold tracking-tight text-foreground uppercase sm:text-5xl"
          >
            {t("title")}
          </h2>
        </div>

        <AutoSlider items={styleCards} label={t("title")} />
        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {styleCards}
        </div>
      </div>
    </section>
  );
}
