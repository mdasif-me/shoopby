import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function NewsletterBanner() {
  const t = await getTranslations("footer.newsletter");

  return (
    <section
      aria-labelledby="newsletter-title"
      className="flex flex-col gap-3 rounded-2xl bg-foreground p-3 text-background sm:gap-6 sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-9"
    >
      <h2
        id="newsletter-title"
        className="max-w-lg font-heading text-base leading-snug font-bold uppercase sm:text-4xl"
      >
        {t("title")}
      </h2>

      <div className="flex w-full flex-col gap-2 sm:gap-3 lg:max-w-sm">
        <label className="flex h-9 items-center gap-2 rounded-full bg-background px-3 text-muted-foreground sm:h-11 sm:gap-3 sm:px-4">
          <Mail className="size-3.5 shrink-0 sm:size-4" />
          <input
            type="email"
            name="email"
            placeholder={t("email_placeholder")}
            aria-label={t("email_placeholder")}
            className="w-full bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
          />
        </label>
        <button
          type="button"
          className="h-9 rounded-full bg-background px-5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:h-11 sm:text-base"
        >
          {t("submit_label")}
        </button>
      </div>
    </section>
  );
}
