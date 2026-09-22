import { linkField } from "@/fields/Link";
import type { Block } from "payload";

export const FooterCtaBlock: Block = {
  slug: "footer-cta", // Unique identifier used in the frontend and API
  interfaceName: "FooterCtaBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Footer Cta Section",
    plural: "Footer Cta Sections",
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      required: true,
      hasMany: false,
      relationTo: "media",
    },
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
      required: true,
      hasMany: false,
      relationTo: "media",
    },
    {
      name: "image2",
      type: "upload",
      required: true,
      hasMany: false,
      relationTo: "media",
    },
  ],
};
