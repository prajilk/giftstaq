import type { Block } from "payload";

export const TestimonialBlock: Block = {
  slug: "testimonial", // Unique identifier used in the frontend and API
  interfaceName: "TestimonialBlock", // Keeps TypeScript types clean
  labels: {
    singular: "Testimonial Section",
    plural: "Testimonial Sections",
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
      name: "image",
      type: "upload",
      required: true,
      hasMany: false,
      relationTo: "media",
    },
    {
      name: "testimonials",
      type: "array",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          required: true,
          hasMany: false,
          relationTo: "media",
        },
        {
          name: "testimonial",
          type: "textarea",
          required: true,
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
