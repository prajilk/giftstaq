import FooterCTASection from "@/components/common/footer-cta-section";
import AboutUsSection from "@/components/pages/home/about-us-section";
import CategorySection from "@/components/pages/home/category-section";
import FAQSection from "@/components/pages/home/faq-section";
import Hero from "@/components/pages/home/hero";
import LogoCloudSection from "@/components/pages/home/logo-cloud-section";
import PopularGiftsSection from "@/components/pages/home/popular-gifts-section";
import ServicesSection from "@/components/pages/home/services-section";
import StepsSection from "@/components/pages/home/steps-section";
import TestimonialSection from "@/components/pages/home/testimonial-section";
import HoverMarquee from "@/components/pages/home/hover-list-section";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { Media } from "@/payload-types";

export default async function Home() {
  const payload = await getPayload({ config });

  const homepage = await payload.findGlobal({
    slug: "homepage",
  });

  if (!homepage.layout) return notFound();

  return (
    <main>
      {homepage.layout?.map((block, index) => {
        switch (block.blockType) {
          case "hero":
            if (typeof block.backgroundImage[0] === "string") return null;
            const image = block.backgroundImage as Media[];
            return (
              <Hero key={index} hero={{ ...block, backgroundImage: image }} />
            );

          case "services":
            return <ServicesSection key={index} {...block} />;

          case "category":
            return <CategorySection key={index} {...block} />;

          case "about-us":
            return <AboutUsSection key={index} {...block} />;

          case "hover-marquee":
            return <HoverMarquee key={index} {...block} />;

          case "popular-gift":
            return <PopularGiftsSection key={index} {...block} />;

          case "logo-cloud":
            return <LogoCloudSection key={index} {...block} />;

          case "steps":
            return <StepsSection key={index} {...block} />;

          case "testimonial":
            return <TestimonialSection key={index} {...block} />;

          case "faq":
            return <FAQSection key={index} {...block} />;

          case "footer-cta":
            return <FooterCTASection key={index} {...block} />;

          default:
            return null;
        }
      })}
    </main>
  );
}
