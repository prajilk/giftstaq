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
      name: "navItems",
      type: "blocks",
      maxRows: 10,
      blocks: [
        {
          slug: "link",
          labels: { singular: "Simple Link", plural: "Simple Links" },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
            { name: "isExternal", type: "checkbox", defaultValue: false },
          ],
        },
        {
          slug: "submenu",
          labels: { singular: "Submenu", plural: "Submenus" },
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
            {
              name: "groups",
              type: "array",
              maxRows: 6,
              labels: {
                singular: "Collection Group",
                plural: "Collection Groups",
              },
              fields: [
                {
                  name: "collectionName",
                  type: "text",
                  required: true,
                },
                {
                  name: "href",
                  type: "text",
                  required: true,
                },
                {
                  name: "products",
                  type: "array",
                  maxRows: 5,
                  labels: { singular: "Product", plural: "Products" },
                  fields: [
                    {
                      name: "product",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "href",
                      type: "text",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
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
