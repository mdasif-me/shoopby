"use client";

import { ErrorMagnetic } from "@/components/motion/error/magnetic";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const t = useTranslations("error");

  return (
    <ErrorMagnetic
      className="py-40"
      code={t("code")}
      title={t("title")}
      description={t("description")}
      retryLabel={t("retry_label")}
      homeLabel={t("home_label")}
      onRetry={reset}
      homeHref="/"
    />
  );
}
