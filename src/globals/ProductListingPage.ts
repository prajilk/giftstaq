import { FooterCtaBlock } from "@/blocks/FooterCtaBlock";
import { SimpleHeroBlock } from "@/blocks/SimpleHeroBlock";
import { revalidateProductListingPage } from "@/utilities/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ProductListingPage: GlobalConfig = {
  slug: "product-listing-page",
  label: "ProductListingPage",
  access: {
    read: () => true, // Allows public API access to fetch the homepage content
  },
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [SimpleHeroBlock, FooterCtaBlock],
    },
  ],
  hooks: {
    afterChange: [revalidateProductListingPage],
  },
};
