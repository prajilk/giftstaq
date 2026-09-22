import type { Block } from "payload";

export const FormBlock: Block = {
  slug: "form", // Unique identifier used in the frontend and API
  interfaceName: "FormBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Form Section",
    plural: "Form Sections",
  },
  fields: [
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "mail",
      type: "email",
      required: true,
    },
    {
      name: "address",
      type: "textarea",
      required: true,
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
  ],
};
