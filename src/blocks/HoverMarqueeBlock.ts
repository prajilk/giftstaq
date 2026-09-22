import { linkField } from "@/fields/Link";
import type { Block } from "payload";

export const HoverMarqueeBlock: Block = {
  slug: "hover-marquee", // Unique identifier used in the frontend and API
  interfaceName: "HoverMarqueeBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Hover Marquee Section",
    plural: "Hover Marquee Sections",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    linkField(),
    {
      name: "rows",
      type: "array",
      required: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "images",
          type: "upload",
          required: true,
          hasMany: true,
          maxRows: 4,
          relationTo: "media",
        },
      ],
    },
  ],
};
