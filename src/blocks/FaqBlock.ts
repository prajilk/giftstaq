import { linkField } from "@/fields/Link";
import type { Block } from "payload";

export const FaqBlock: Block = {
  slug: "faq", // Unique identifier used in the frontend and API
  interfaceName: "FaqBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Faq Section",
    plural: "Faq Sections",
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
      name: "faqs",
      type: "array",
      required: true,
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
