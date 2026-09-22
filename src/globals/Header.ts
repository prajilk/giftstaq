import { linkField } from "@/fields/Link";
import { revalidateHeaderOrFooter } from "@/utilities/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  access: {
    read: () => true, // Allows public API access to fetch the header content
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
      name: "navLinks",
      type: "array",
      required: true,
      fields: [linkField()],
    },
    {
      name: "offers",
      type: "array",
      required: true,
      fields: [
        {
          name: "offer",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeaderOrFooter],
  },
};
