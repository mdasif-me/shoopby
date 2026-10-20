"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPRING_PRESS } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface ErrorProps {
  className?: string;
  /** The big status code. */
  code?: string;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export const ERROR_DEFAULTS = {
  code: "500",
  title: "Something went wrong",
  description: "An unexpected error occurred. Please try again.",
  homeHref: "/",
  homeLabel: "Back to Home",
  retryLabel: "Try Again",
} as const;

type ActionsProps = Pick<
  ErrorProps,
  "homeHref" | "homeLabel" | "retryLabel" | "onRetry" | "className"
>;

/** Primary retry, then a secondary link back home. */
export function ErrorActions({
  homeHref = ERROR_DEFAULTS.homeHref,
  homeLabel = ERROR_DEFAULTS.homeLabel,
  retryLabel = ERROR_DEFAULTS.retryLabel,
  onRetry,
  className,
}: ActionsProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const whileTap = reduce ? undefined : { scale: 0.96 };
  const whileHover = reduce || !canHover ? undefined : { scale: 1.02 };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      {onRetry ? (
        <motion.button
          type="button"
          onClick={onRetry}
          whileTap={whileTap}
          whileHover={whileHover}
          transition={SPRING_PRESS}
          className="inline-flex h-11 select-none items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {retryLabel}
        </motion.button>
      ) : null}
      <motion.a
        href={homeHref}
        whileTap={whileTap}
        whileHover={whileHover}
        transition={SPRING_PRESS}
        className="inline-flex h-11 select-none items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
      >
        {homeLabel}
      </motion.a>
    </div>
  );
}

/** Centers a variant and gives it a consistent minimum stage height. */
export function ErrorStage({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[420px] w-full flex-col items-center justify-center gap-8 px-4 text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
