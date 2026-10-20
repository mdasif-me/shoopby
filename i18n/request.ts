import { getRequestConfig, GetRequestConfigParams } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async (params: GetRequestConfigParams) => {
  const store = await cookies();
  const locale = params.locale || store.get("locale")?.value || "en";
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
