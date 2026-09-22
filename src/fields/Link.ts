import type { Field } from "payload";

export const linkField = (): Field => ({
  name: "link",
  type: "group",

  fields: [
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "href",
      type: "text",
      required: true,
    },
    {
      name: "isExternal",
      type: "checkbox",
      defaultValue: false,
    },
  ],
});
