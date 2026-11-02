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
      maxRows: 1,
      required: true,
      fields: [linkField()],
    },
    {
      name: "backgrounds",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Background",
        plural: "Backgrounds",
      },
      fields: [
        {
          name: "desktopImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "mobileImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "Optional image or video for mobile. Falls back to the desktop file if empty.",
          },
        },
      ],
    },
  ],
};
