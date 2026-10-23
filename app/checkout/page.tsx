import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckoutView } from "@/components/checkout/checkout-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("checkout");
  return { title: t("title") };
}

export default async function CheckoutPage() {
  const platform = await getTranslations("app.platform");

  return <CheckoutView currencySymbol={platform("currency_symbol")} />;
}
