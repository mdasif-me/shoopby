"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function changeLocaleAction(locale: string) {
  const store = await cookies();
  store.set("locale", locale);
  revalidatePath("/");
}
