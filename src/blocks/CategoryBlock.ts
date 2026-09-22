import type { Block } from "payload";

export const CategoryBlock: Block = {
  slug: "category", // Unique identifier used in the frontend and API
  interfaceName: "CategoryBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Category Section",
    plural: "Category Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
  ],
};
