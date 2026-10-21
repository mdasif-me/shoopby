"use client";

import { useLocale } from "next-intl";
import { useTransition, type ComponentPropsWithoutRef } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { changeLocaleAction } from "@/actions/locale";
import { ActionSwapText } from "./action-swap";

type LanguageSwitcherProps = ComponentPropsWithoutRef<"button">;

const VT_STYLE_ID = "beui-language-vt";

const VT_CSS = `
html[data-beui-language-vt="fade-blur"]::view-transition-old(root) {
  animation: beui-language-fade-blur-out 1500ms
    cubic-bezier(0.4, 0, 0.2, 1);
  mix-blend-mode: normal;
}

html[data-beui-language-vt="fade-blur"]::view-transition-new(root) {
  animation: beui-language-fade-blur-in 1500ms
    cubic-bezier(0.4, 0, 0.2, 1);
  mix-blend-mode: normal;
}

@keyframes beui-language-fade-blur-out {
  from {
    opacity: 1;
    filter: blur(0);
  }

  to {
    opacity: 0;
    filter: blur(20px);
  }
}

@keyframes beui-language-fade-blur-in {
  from {
    opacity: 0;
    filter: blur(20px);
  }

  to {
    opacity: 1;
    filter: blur(0);
  }
}
`;

function ensureViewTransitionStyles() {
  if (document.getElementById(VT_STYLE_ID)) return;

  const style = document.createElement("style");

  style.id = VT_STYLE_ID;
  style.textContent = VT_CSS;

  document.head.appendChild(style);
}

export function LanguageSwitcher({
  className,
  ...props
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const reduce = useReducedMotion() ?? false;

  const toggleLocale = () => {
    if (isPending) return;

    const nextLocale = locale === "en" ? "bn" : "en";

    // Fallback for reduced motion / unsupported browsers
    if (reduce || !("startViewTransition" in document)) {
      startTransition(async () => {
        await changeLocaleAction(nextLocale);
      });

      return;
    }

    ensureViewTransitionStyles();

    const root = document.documentElement;

    root.dataset.beuiLanguageVt = "fade-blur";

    const vt = document.startViewTransition(() => {
      startTransition(async () => {
        await changeLocaleAction(nextLocale);
      });
    });

    vt.finished.finally(() => {
      delete root.dataset.beuiLanguageVt;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      disabled={isPending}
      aria-label="Toggle language"
      aria-busy={isPending}
      className={cn(
        "flex size-9 items-center justify-center rounded-full",
        "bg-white/20 p-0 backdrop-blur-md",
        "transition-all duration-200",
        "hover:bg-neutral-100",
        "active:scale-95",
        "disabled:pointer-events-none disabled:opacity-70",
        "dark:bg-black/20 dark:hover:bg-white/10",
        className,
      )}
      {...props}
    >
      <ActionSwapText
        value={locale}
        animation="blur"
        className="text-xs font-bold uppercase"
      >
        {locale}
      </ActionSwapText>
    </button>
  );
}