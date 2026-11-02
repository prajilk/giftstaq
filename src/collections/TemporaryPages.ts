import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

export const TemporaryPages: CollectionConfig = {
  slug: "temporary-pages",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          'e.g. "employee-onboarding" — used in the URL - lowercase only!',
      },
    },
    { name: "whatsappNumber", type: "text", required: true },
    {
      name: "images",
      type: "upload",
      required: true,
      hasMany: true,
      relationTo: "media",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        req.payload.logger.info(`Revalidating /${doc.slug}`);
        revalidatePath(`/${doc.slug}`);
        return doc;
      },
    ],
  },
};
