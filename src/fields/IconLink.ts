import type { Field } from "payload";

export const iconLinkField = (): Field => ({
  name: "iconLink",
  type: "group",

  fields: [
    {
      name: "icon",
      type: "upload",
      required: true,
      hasMany: false,
      relationTo: "media",
    },
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
