import type { Block } from "payload";

export const ServicesBlock: Block = {
  slug: "services", // Unique identifier used in the frontend and API
  interfaceName: "ServicesBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Services Section",
    plural: "Services Sections",
  },
  fields: [
    {
      name: "services",
      type: "array",
      required: true,
      fields: [
        {
          name: "icon",
          type: "upload",
          required: true,
          hasMany: false,
          relationTo: "media",
        },
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
      ],
    },
  ],
};
