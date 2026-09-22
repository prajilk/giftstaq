"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { emailSubscribeSchema } from "@/lib/zod";
import { z } from "zod";

export async function emailSubscribeForm(data: unknown) {
  const parsed = emailSubscribeSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: z.treeifyError(parsed.error) };
  }

  const payload = await getPayload({ config });

  try {
    const submission = await payload.create({
      collection: "email-subscribe-submissions",
      data: parsed.data,
    });

    return { success: true, submission };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to submit form" };
  }
}
