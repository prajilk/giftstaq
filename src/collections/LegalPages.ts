import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: 'e.g. "privacy-policy" — used in the URL' },
    },
    { name: "content", type: "richText", required: true },
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
