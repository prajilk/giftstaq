import type { CollectionConfig } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const Colors: CollectionConfig = {
  slug: "colors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "hex"],
  },
  access: {
    read: () => true, // needed so the frontend can read it
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          'Must match the color name used in Shopify, e.g. "Midnight Blue"',
      },
    },
    {
      name: "hex",
      type: "text",
      required: true,
      admin: { description: "e.g. #1A2B3C" },
      validate: (value?: string | null) =>
        /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value ?? "") ||
        "Enter a valid hex code like #FF5733 or #F53",
    },
  ],
  hooks: {
    afterChange: [() => revalidateTag("colors", { expire: 0 })],
    afterDelete: [() => revalidateTag("colors", { expire: 0 })],
  },
};
