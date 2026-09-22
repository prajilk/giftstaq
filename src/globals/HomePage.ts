import { AboutUsBlock } from "@/blocks/AboutUsBlock";
import { CategoryBlock } from "@/blocks/CategoryBlock";
import { FaqBlock } from "@/blocks/FaqBlock";
import { FooterCtaBlock } from "@/blocks/FooterCtaBlock";
import { HeroBlock } from "@/blocks/HeroBlock";
import { HoverMarqueeBlock } from "@/blocks/HoverMarqueeBlock";
import { LogoCloudBlock } from "@/blocks/LogoCloudBlock";
import { PopularGiftBlock } from "@/blocks/PopularGiftBlock";
import { ServicesBlock } from "@/blocks/ServicesBlock";
import { StepsBlock } from "@/blocks/StepsBlock";
import { TestimonialBlock } from "@/blocks/TestimonialBlock";
import { revalidateHomepage } from "@/utilities/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: {
    read: () => true, // Allows public API access to fetch the homepage content
  },
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [
        HeroBlock,
        ServicesBlock,
        CategoryBlock,
        AboutUsBlock,
        HoverMarqueeBlock,
        PopularGiftBlock,
        LogoCloudBlock,
        StepsBlock,
        TestimonialBlock,
        FaqBlock,
        FooterCtaBlock,
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
};
