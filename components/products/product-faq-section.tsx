import { getTranslations } from "next-intl/server";

const questions = ["faq_1", "faq_2", "faq_3"] as const;

export async function ProductFaqSection() {
  const t = await getTranslations("products.details");

  return (
    <section aria-labelledby="product-faq-title" className="py-5 sm:py-7">
      <h2 id="product-faq-title" className="mb-4 text-lg font-bold sm:text-xl">
        {t("faq_title")}
      </h2>
      <div className="divide-y divide-border rounded-2xl border border-border">
        {questions.map((question) => (
          <details key={question} className="group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {t(`${question}.question`)}
              <span className="text-lg text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(`${question}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
