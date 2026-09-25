import type { Block } from "payload";

export const SimpleHeroBlock: Block = {
  slug: "simple-hero", // Unique identifier used in the frontend and API
  interfaceName: "SimpleHeroBlock", // Keeps TypeScript types clean
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
      name: "backgroundImage",
      type: "upload",
      required: true,
      hasMany: false,
      relationTo: "media",
    },
  ],
};
