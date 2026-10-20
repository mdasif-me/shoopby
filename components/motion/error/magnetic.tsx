"use client";

import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";
import {
  ERROR_DEFAULTS,
  ErrorActions,
  ErrorStage,
  type ErrorProps,
} from "./shared";

export function ErrorMagnetic({
  className,
  code = ERROR_DEFAULTS.code,
  title = ERROR_DEFAULTS.title,
  description = ERROR_DEFAULTS.description,
  homeHref,
  homeLabel,
  retryLabel,
  onRetry,
}: ErrorProps) {
  const chars = code.split("");

  return (
    <ErrorStage className={className}>
      <h1
        aria-label={code}
        className="flex select-none items-center justify-center font-bold leading-none tracking-tighter text-foreground [font-size:clamp(5rem,18vw,12rem)]"
      >
        {chars.map((ch, i) => (
          <Magnetic
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed positional glyphs
            key={i}
            strength={0.6}
            className={cn(i > 0 && "-ms-2")}
          >
            <span aria-hidden className="inline-block px-1 tabular-nums">
              {ch}
            </span>
          </Magnetic>
        ))}
      </h1>

      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-foreground">{title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      <ErrorActions
        homeHref={homeHref}
        homeLabel={homeLabel}
        retryLabel={retryLabel}
        onRetry={onRetry}
      />
    </ErrorStage>
  );
}
