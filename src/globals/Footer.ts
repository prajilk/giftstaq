import { iconLinkField } from "@/fields/IconLink";
import { linkField } from "@/fields/Link";
import { revalidateHeaderOrFooter } from "@/utilities/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  access: {
    read: () => true, // Allows public API access to fetch the footer content
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
      name: "socialLinks",
      type: "array",
      required: true,
      fields: [iconLinkField()],
    },
    {
      name: "navLinks",
      type: "array",
      required: true,
      maxRows: 3,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "links",
          type: "array",
          required: true,
          fields: [linkField()],
        },
      ],
    },
    {
      name: "contact",
      type: "array",
      required: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        linkField(),
      ],
    },
    {
      name: "policies",
      type: "array",
      required: true,
      fields: [linkField()],
    },
  ],
  hooks: {
    afterChange: [revalidateHeaderOrFooter],
  },
};
