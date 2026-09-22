import type { Block } from "payload";

export const StepsBlock: Block = {
  slug: "steps", // Unique identifier used in the frontend and API
  interfaceName: "StepsBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Steps Section",
    plural: "Steps Sections",
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
      name: "steps",
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
      ],
    },
  ],
};
