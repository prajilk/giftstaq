import { FaqBlock } from "@/blocks/FaqBlock";
import { FooterCtaBlock } from "@/blocks/FooterCtaBlock";
import { FormBlock } from "@/blocks/FormBlock";
import { SimpleHeroBlock } from "@/blocks/SimpleHeroBlock";
import { revalidateContactPage } from "@/utilities/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "ContactPage",
  access: {
    read: () => true, // Allows public API access to fetch the homepage content
  },
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [SimpleHeroBlock, FormBlock, FaqBlock, FooterCtaBlock],
    },
  ],
  hooks: {
    afterChange: [revalidateContactPage],
  },
};
