import { linkField } from "@/fields/Link";
import type { Block } from "payload";

export const AboutUsBlock: Block = {
  slug: "about-us", // Unique identifier used in the frontend and API
  interfaceName: "AboutUsBlock", // Keeps TypeScript types clean
  labels: {
    singular: "About Us Section",
    plural: "About Us Sections",
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
    linkField(),
    {
      name: "image1",
      type: "upload",
      hasMany: false,
      required: true,
      relationTo: "media",
    },
    {
      name: "image2",
      type: "upload",
      hasMany: false,
      required: true,
      relationTo: "media",
    },
    {
      name: "card",
      type: "array",
      maxRows: 2,
      required: true,
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "label",
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
