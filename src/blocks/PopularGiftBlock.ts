import type { Block } from "payload";

export const PopularGiftBlock: Block = {
  slug: "popular-gift", // Unique identifier used in the frontend and API
  interfaceName: "PopularGiftBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Popular Gift Section",
    plural: "Popular Gift Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "cards",
      type: "array",
      required: true,
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
          name: "image",
          type: "upload",
          required: true,
          hasMany: false,
          relationTo: "media",
        },
        {
          name: "link",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
