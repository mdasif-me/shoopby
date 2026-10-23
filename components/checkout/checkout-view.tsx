"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart/cart-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { calculateCartTotals } from "@/lib/cart/cart-types";

function CheckoutField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  pattern,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
}) {
  return (
    <label className="block space-y-1.5 text-sm font-medium text-foreground">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm font-normal outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10"
      />
    </label>
  );
}

export function CheckoutView({
  currencySymbol,
}: {
  currencySymbol: string;
}) {
  const t = useTranslations("checkout");
  const cartT = useTranslations("cart");
  const { checkoutItems, promoCode, isReady } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const totals = calculateCartTotals(checkoutItems, promoCode);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1440px] px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-9 lg:px-8">
      <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground">
          <LockKeyhole aria-hidden="true" className="size-3.5 text-foreground" />
          {t("secure_checkout")}
        </div>
      </div>

      {!isReady ? (
        <p role="status" className="py-12 text-center text-sm text-muted-foreground">
          {cartT("loading")}
        </p>
      ) : checkoutItems.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-border bg-muted/20 px-5 py-12 text-center">
          <h2 className="font-semibold text-foreground">
            {t("validation.cart_empty")}
          </h2>
          <Link
            href="/category"
            className={buttonVariants({
              className:
                "mt-5 rounded-full bg-black text-white hover:bg-neutral-800",
            })}
          >
            {cartT("continue_shopping")}
          </Link>
        </section>
      ) : (
        <>
          <div className="mb-5 rounded-2xl border border-border bg-muted/40 px-4 py-3.5 text-sm text-muted-foreground sm:px-5">
            {t("demo_notice")}
          </div>
          {submitted && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-950"
            >
              {t("demo_submitted")}
            </div>
          )}

          <div className="grid items-start gap-5 lg:grid-cols-[1.35fr_1fr] lg:gap-7">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-7"
            >
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
                    01
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    {t("customer_information.title")}
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CheckoutField
                    label={t("customer_information.full_name")}
                    name="name"
                    required
                  />
                  <CheckoutField
                    label={t("customer_information.phone")}
                    name="phone"
                    type="tel"
                    pattern="(?:\\+?88)?01[3-9][0-9]{8}"
                    required
                  />
                  <div className="sm:col-span-2">
                    <CheckoutField
                      label={`${t("customer_information.email")} (${t("customer_information.optional")})`}
                      name="email"
                      type="email"
                    />
                  </div>
                </div>
              </section>

              <section className="border-t border-border pt-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
                    02
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    {t("shipping_address.title")}
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CheckoutField
                    label={t("shipping_address.division")}
                    name="division"
                    required
                  />
                  <CheckoutField
                    label={t("shipping_address.district")}
                    name="district"
                    required
                  />
                  <CheckoutField
                    label={t("shipping_address.upazila")}
                    name="upazila"
                  />
                  <CheckoutField label={t("shipping_address.city")} name="city" />
                  <div className="sm:col-span-2">
                    <CheckoutField
                      label={t("shipping_address.address_line")}
                      name="address"
                      placeholder={t("shipping_address.address_placeholder")}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block space-y-1.5 text-sm font-medium text-foreground">
                      <span>{t("shipping_address.delivery_note")}</span>
                      <textarea
                        name="deliveryNote"
                        placeholder={t(
                          "shipping_address.delivery_note_placeholder",
                        )}
                        rows={3}
                        className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm font-normal outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                      />
                    </label>
                  </div>
                </div>
              </section>

              <section className="border-t border-border pt-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
                    03
                  </span>
                  <h2 className="text-lg font-bold text-foreground">
                    {t("payment.title")}
                  </h2>
                </div>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-foreground bg-muted/30 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="cash-on-delivery"
                    defaultChecked
                    className="mt-1 accent-foreground"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {t("payment.cash_on_delivery")}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {t("payment.cash_on_delivery_description")}
                    </span>
                  </span>
                </label>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground">
                  <span>{t("payment.online_payment")}</span>
                  <span className="text-xs">
                    {t("payment.online_payment_coming_soon")}
                  </span>
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
                <Link
                  href="/cart"
                  className={buttonVariants({
                    variant: "outline",
                    className: "rounded-full px-6",
                  })}
                >
                  {t("actions.back")}
                </Link>
                <Button
                  type="submit"
                  className="rounded-full bg-black px-7 text-white hover:bg-neutral-800"
                >
                  {t("actions.place_order")}
                </Button>
              </div>
            </form>

            <aside className="h-fit rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-foreground">
                  {t("order_summary.title")}
                </h2>
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {cartT("items_label", {
                    count: checkoutItems.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    ),
                  })}
                </span>
              </div>
              <ul className="mt-4 divide-y divide-border">
                {checkoutItems.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between gap-3 py-3 text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="min-w-0 text-muted-foreground">
                        <span className="line-clamp-1 font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="mt-1 block text-xs">
                          {item.size} · {item.colorName} × {item.quantity}
                        </span>
                      </span>
                    </div>
                    <span className="shrink-0 font-semibold text-foreground">
                      {currencySymbol}
                      {item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-2 space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex justify-between gap-3 text-muted-foreground">
                  <dt>{t("order_summary.subtotal")}</dt>
                  <dd className="font-semibold text-foreground">
                    {currencySymbol}
                    {totals.subtotal}
                  </dd>
                </div>
                <div className="flex justify-between gap-3 text-muted-foreground">
                  <dt>{t("order_summary.discount")}</dt>
                  <dd className="font-semibold text-rose-500">
                    {totals.discount > 0 ? "-" : ""}
                    {currencySymbol}
                    {totals.discount}
                  </dd>
                </div>
                <div className="flex justify-between gap-3 text-muted-foreground">
                  <dt>{t("order_summary.shipping")}</dt>
                  <dd className="font-semibold text-foreground">
                    {currencySymbol}
                    {totals.shipping}
                  </dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-border pt-4 font-bold text-foreground">
                  <dt>{t("order_summary.total")}</dt>
                  <dd>
                    {currencySymbol}
                    {totals.total}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 rounded-xl bg-muted/50 px-3.5 py-3 text-xs text-muted-foreground">
                {t("payment.cash_on_delivery")}
              </p>
            </aside>
          </div>
        </>
      )}
    </main>
  );
}
