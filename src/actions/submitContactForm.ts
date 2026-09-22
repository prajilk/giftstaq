"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { contactUsSchema } from "@/lib/zod";
import { z } from "zod";

export async function submitContactForm(data: unknown) {
  const parsed = contactUsSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: z.treeifyError(parsed.error) };
  }

  const payload = await getPayload({ config });

  try {
    const submission = await payload.create({
      collection: "contact-submissions",
      data: parsed.data,
    });

    return { success: true, submission };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to submit form" };
  }
}
