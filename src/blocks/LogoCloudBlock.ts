import type { Block } from "payload";

export const LogoCloudBlock: Block = {
  slug: "logo-cloud", // Unique identifier used in the frontend and API
  interfaceName: "LogoCloudBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Logo Cloud Section",
    plural: "Logo Cloud Sections",
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
      name: "logos",
      type: "upload",
      required: true,
      hasMany: true,
      relationTo: "media",
    },
  ],
};
