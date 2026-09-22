import { linkField } from "@/fields/Link";
import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero", // Unique identifier used in the frontend and API
  interfaceName: "HeroBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "link",
      type: "array",
      maxRows: 2,
      required: true,
      fields: [linkField()],
    },
    {
      name: "backgroundImage",
      type: "upload",
      required: true,
      hasMany: true,
      relationTo: "media",
    },
  ],
};
