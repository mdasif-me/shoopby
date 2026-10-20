import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  IBM_Plex_Sans,
  Baloo_Da_2,
} from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

// google fonts
const ibmPlexSansHeading = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-heading",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  variable: "--font-sans",
  style: "normal",
});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app.platform");

  return {
    title: {
      template: `%s | ${t("name")}`,
      default: `${t("name")} - ${t("tagline")}`,
    },
    description: t("short_description"),
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html suppressHydrationWarning lang={locale} className="h-full">
      <head />
      <body
        suppressHydrationWarning
        className={cn(
          "h-full",
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          "font-sans",
          locale === "bn" ? balooDa2.variable : inter.variable,
          ibmPlexSansHeading.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <SmoothScroll root={true}>{children}</SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
