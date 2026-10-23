import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NewsletterBanner } from "@/components/home/newsletter-banner";

const footerGroups = [
  {
    title: "company",
    links: [
      { label: "about_us", href: "/about" },
      { label: "features", href: "/products" },
      { label: "careers", href: "/contact" },
    ],
  },
  {
    title: "help",
    links: [
      { label: "contact_us", href: "/contact" },
      { label: "shipping_policy", href: "/shipping" },
      { label: "terms_conditions", href: "/terms" },
      { label: "privacy_policy", href: "/privacy" },
    ],
  },
  {
    title: "faq_title",
    links: [
      { label: "faq", href: "/faq" },
      { label: "how_to_order", href: "/how-to-order" },
    ],
  },
  {
    title: "resources",
    links: [
      { label: "products", href: "/products" },
      { label: "brands", href: "/brands" },
      { label: "deals", href: "/deals" },
    ],
  },
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", mark: "f" },
  { label: "Instagram", href: "https://www.instagram.com", mark: "◎" },
  { label: "YouTube", href: "https://www.youtube.com", mark: "▶" },
  { label: "GitHub", href: "https://github.com", mark: "GH" },
] as const;

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const navigation = await getTranslations("navigation");
  const platform = await getTranslations("app.platform");

  return (
    <footer className="bg-muted">
      <div className="mx-auto w-full max-w-360 px-2 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <NewsletterBanner />

        <div className="grid grid-cols-2 gap-x-4 gap-y-7 py-8 sm:gap-10 sm:py-10 lg:grid-cols-8 lg:gap-8 lg:py-8">
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              aria-label={platform("name")}
              className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {platform("name").toUpperCase()}
            </Link>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t("description")}
            </p>
            <div className="mt-3 flex items-center gap-2 sm:mt-5">
              {socialLinks.map(({ label, href, mark }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-8 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background sm:size-9"
                >
                  <span className="text-sm font-bold leading-none">{mark}</span>
                </a>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={t(group.title)}>
              <h3 className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase sm:mb-4 sm:text-base">
                {t(group.title)}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-base"
                    >
                      {link.label === "products"
                        ? navigation("products")
                        : link.label === "brands"
                          ? navigation("brands")
                          : link.label === "deals"
                            ? navigation("deals")
                            : t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 flex flex-col items-center lg:col-span-2">
            <div className="flex flex-wrap justify-center gap-2">
              {["VISA", "Mastercard", "PayPal", "Apple Pay", "G Pay"].map(
                (method) => (
                  <span
                    key={method}
                    className="rounded-md border border-border bg-background px-2 py-1.5 text-[9px] font-bold text-foreground shadow-sm"
                  >
                    {method}
                  </span>
                ),
              )}
            </div>
            <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
