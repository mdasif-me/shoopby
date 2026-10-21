"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/motion/language-switcher";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { ExpandableTabs } from "@/components/motion/expandable-tabs";
import {
  ArrowUpRight,
  House,
  LogOut,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
  User,
  X,
} from "lucide-react";

const navLinkClass =
  "rounded-none bg-transparent p-0 text-sm font-normal whitespace-nowrap text-neutral-900 no-underline hover:bg-transparent hover:text-neutral-500 focus:bg-transparent xl:text-base dark:text-white dark:hover:text-neutral-300";

const circleClass =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-colors hover:bg-neutral-50 lg:size-12 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900";

const menuLinks = [
  { key: "on_sale", href: "/deals" },
  { key: "new_arrivals", href: "/products?sort=newest" },
  { key: "brands", href: "/brands" },
] as const;

const shopGroups = [
  {
    titleKey: "fashion",
    links: [
      { labelKey: "women", href: "/products?category=women" },
      { labelKey: "men", href: "/products?category=men" },
      { labelKey: "kids", href: "/products?category=kids" },
      { labelKey: "shoes", href: "/products?category=shoes" },
      { labelKey: "accessories", href: "/products?category=accessories" },
    ],
  },
  {
    titleKey: "lifestyle",
    links: [
      { labelKey: "electronics", href: "/products?category=electronics" },
      { labelKey: "home", href: "/products?category=home" },
      { labelKey: "beauty", href: "/products?category=beauty" },
      { labelKey: "groceries", href: "/products?category=groceries" },
      { labelKey: "sports", href: "/products?category=sports" },
    ],
  },
] as const;

function BrandLogo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Shoopby" className={cn("shrink-0 no-underline", className)}>
      <img
        src="/logo.svg"
        alt="Shoopby"
        width={110}
        height={36}
        className="h-12 w-auto lg:h-10 dark:[filter:brightness(0)_invert(1)]"
      />
    </Link>
  );
}

function ProductSearch({
  className,
  autoFocus,
}: {
  className?: string;
  autoFocus?: boolean;
}) {
  const t = useTranslations("navigation");

  return (
    <form action="/products" className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute top-1/2 start-4 size-5 -translate-y-1/2 text-neutral-400" />
      <Input
        type="search"
        name="q"
        autoFocus={autoFocus}
        placeholder={t("search_placeholder")}
        className="h-12 rounded-full border-transparent bg-[#F0F0F0] ps-12 pe-5 text-sm shadow-none placeholder:text-neutral-500 focus-visible:border-transparent focus-visible:ring-0 md:text-base dark:bg-neutral-800"
      />
    </form>
  );
}

function PromoBanner() {
  const t = useTranslations("navigation");
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-black text-white">
      <p className="px-12 py-2.5 text-center text-[13px] leading-snug sm:text-sm">
        {t("promo_message")}{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4"
        >
          {t("promo_action")}
        </Link>
      </p>
      <button
        type="button"
        aria-label={t("promo_dismiss")}
        onClick={() => setVisible(false)}
        className="absolute end-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-white hover:bg-white/10 sm:end-6"
      >
        <X className="size-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

function AccountMenu() {
  const t = useTranslations("navigation");
  const account = useTranslations("account.navigation");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button type="button" aria-label={t("account")} className={circleClass} />
        }
      >
        <User className="size-5" strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-xl">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-xs text-neutral-400 uppercase">{t("preferences")}</span>
          <div className="flex items-center gap-1">
            <ThemeToggle iconClassName="size-4" />
            <LanguageSwitcher />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1.5 text-xs text-neutral-400 uppercase">
            {t("account")}
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm"
            render={<Link href="/account" />}
          >
            <User className="h-4 w-4" /> {account("profile")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm"
            render={<Link href="/account/orders" />}
          >
            <ShoppingBag className="h-4 w-4" /> {account("orders")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm"
            render={<Link href="/account/settings" />}
          >
            <Settings className="h-4 w-4" /> {account("settings")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm"
        >
          <LogOut className="h-4 w-4" /> {account("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function routeTab(pathname: string) {
  if (pathname.startsWith("/account")) return "profile";
  if (
    pathname.startsWith("/products") ||
    pathname.startsWith("/deals") ||
    pathname.startsWith("/brands") ||
    pathname.startsWith("/cart")
  ) {
    return "products";
  }
  return "home";
}

function MobileDock() {
  const t = useTranslations("navigation");
  const account = useTranslations("account.navigation");
  const shop = useTranslations("navigation.shop_menu");
  const pathname = usePathname();
  const router = useRouter();
  const [tab, setTab] = useState<string | null>(null);

  const close = () => setTab(null);

  const linkClass =
    "block w-full rounded-xl px-3 py-2.5 text-start text-sm font-medium text-neutral-900 no-underline hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden dark:bg-neutral-950/95">
      <ExpandableTabs
        fullWidth
        selectedId={routeTab(pathname)}
        value={tab}
        onValueChange={setTab}
        className="w-full rounded-none border-x-0 border-b-0 shadow-none"
        classNames={{
          activeTab: "text-white dark:text-neutral-950",
          pill: "bg-neutral-950 dark:bg-white",
        }}
        items={[
          {
            id: "home",
            label: t("home"),
            icon: <House className="size-4" />,
            onSelect: () => {
              if (pathname !== "/") router.push("/");
            },
          },
          {
            id: "products",
            label: t("products_tab"),
            icon: <ShoppingBag className="size-4" />,
            content: (
              <div className="flex w-full flex-col py-1">
                <Link href="/products" onClick={close} className={linkClass}>
                  {t("products")}
                </Link>
                <Link href="/deals" onClick={close} className={linkClass}>
                  {t("on_sale")}
                </Link>
                <Link href="/products?sort=newest" onClick={close} className={linkClass}>
                  {t("new_arrivals")}
                </Link>
                <Link href="/cart" onClick={close} className={linkClass}>
                  {t("cart")}
                </Link>
              </div>
            ),
          },
          {
            id: "shop",
            label: t("shop"),
            icon: <Store className="size-4" />,
            content: (
              <div className="flex max-h-72 w-full flex-col gap-2 overflow-y-auto py-1 text-start">
                {shopGroups.map((group) => (
                  <div key={group.titleKey} className="flex flex-col">
                    <span className="px-3 py-1 text-[11px] tracking-wide text-neutral-400 uppercase">
                      {shop(group.titleKey)}
                    </span>
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} onClick={close} className={linkClass}>
                        {shop(link.labelKey)}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ),
          },
          {
            id: "profile",
            label: t("profile"),
            icon: <User className="size-4" />,
            content: (
              <div className="flex w-full flex-col py-1">
                <Link href="/account" onClick={close} className={linkClass}>
                  {account("profile")}
                </Link>
                <Link href="/account/orders" onClick={close} className={linkClass}>
                  {account("orders")}
                </Link>
                <Link href="/account/settings" onClick={close} className={linkClass}>
                  {account("settings")}
                </Link>
                <div className="mt-1 flex items-center gap-1 px-2">
                  <ThemeToggle iconClassName="size-4" />
                  <LanguageSwitcher />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export function Navigation() {
  const t = useTranslations("navigation");
  const shop = useTranslations("navigation.shop_menu");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-neutral-950">
        <PromoBanner />
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8 lg:py-4 xl:gap-8 xl:py-5">
          <BrandLogo />

          <div className="hidden lg:block">
            <NavigationMenu className="flex-none">
              <NavigationMenuList className="justify-start gap-3 xl:gap-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      navLinkClass,
                      "h-auto data-open:bg-transparent data-open:hover:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent",
                    )}
                  >
                    {t("shop")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[min(720px,calc(100vw-2rem))] grid-cols-2 gap-4 p-4 xl:grid-cols-3 xl:gap-6">
                      {shopGroups.map((group) => (
                        <div key={group.titleKey} className="flex flex-col gap-2">
                          <h4 className="mb-1 text-xs text-neutral-400 uppercase">
                            {shop(group.titleKey)}
                          </h4>
                          {group.links.map((link) => (
                            <NavigationMenuLink
                              key={link.href}
                              href={link.href}
                              className="rounded-lg p-0 text-sm font-medium text-neutral-600 no-underline hover:bg-transparent hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                            >
                              {shop(link.labelKey)}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      ))}
                      <div className="col-span-2 flex flex-col xl:col-span-1">
                        <h4 className="mb-3 text-xs text-neutral-400 uppercase">
                          {shop("featured")}
                        </h4>
                        <Link
                          href="/products"
                          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-neutral-100 p-5 no-underline dark:bg-neutral-900"
                        >
                          <div>
                            <Badge variant="outline" className="mb-3">
                              {t("shop")}
                            </Badge>
                            <h4 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">
                              {shop("featured_title")}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {shop("featured_description")}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center text-sm font-medium text-neutral-900 dark:text-white">
                            {shop("featured_action")}
                            <ArrowUpRight className="ms-1 size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {menuLinks.map((item) => (
                  <NavigationMenuItem key={item.key}>
                    <NavigationMenuLink className={navLinkClass} href={item.href}>
                      {t(item.key)}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <ProductSearch className="ms-auto hidden min-w-0 flex-1 basis-[160px] lg:block xl:max-w-xl" />

          <div className="ms-auto flex shrink-0 items-center gap-2 lg:ms-0 xl:gap-3">
            <button
              type="button"
              aria-label={t("search")}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className={cn(circleClass, "lg:hidden", searchOpen && "bg-neutral-100 dark:bg-neutral-800")}
            >
              <Search className="size-5" strokeWidth={1.75} />
            </button>
            <Link href="/cart" aria-label={t("cart")} className={cn(circleClass, "hidden lg:inline-flex")}>
              <ShoppingCart className="size-5" strokeWidth={1.75} />
            </Link>
            <AccountMenu />
          </div>
        </div>

        {searchOpen ? (
          <div className="px-4 pb-4 sm:px-6 lg:hidden">
            <ProductSearch autoFocus />
          </div>
        ) : null}
      </header>
      <MobileDock />
    </>
  );
}
