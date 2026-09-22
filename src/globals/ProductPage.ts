import { FooterCtaBlock } from "@/blocks/FooterCtaBlock";
import { SimpleHeroBlock } from "@/blocks/SimpleHeroBlock";
import { revalidateProductPage } from "@/utilities/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ProductPage: GlobalConfig = {
  slug: "product",
  label: "ProductPage",
  access: {
    read: () => true, // Allows public API access to fetch the homepage content
  },
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [FooterCtaBlock],
    },
  ],
  hooks: {
    afterChange: [revalidateProductPage],
  },
};
