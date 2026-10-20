import { NotFoundMagnetic } from "@/components/motion/not-found/magnetic";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <NotFoundMagnetic
        title={t("title")}
        description={t("description")}
        homeLabel={t("home_label")}
        homeHref="/"
        browseLabel={t("browse_label")}
        browseHref="/products"
      />
    </div>
  );
}
