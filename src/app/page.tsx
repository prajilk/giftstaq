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
import HoverMarquee from "../components/pages/home/hover-list-section";

export default function Home() {
  return (
    <main>
      <Hero
        hero={{
          id: 1,
          title: "Premium Gifts That Build Stronger Business Relationships",
          description:
            "Customized corporate gifts and branded merchandise for employees, clients, and events all delivered with quality and care.",
          background: [
            {
              id: 2,
              type: "image",
              background: {
                id: 3,
                documentId: "bg",
                url: "/local/bg.webp",
                alternativeText: null,
              },
              responsive_image: {
                id: 4,
                documentId: "bg-res",
                url: "/local/bg-res.webp",
                alternativeText: null,
              },
            },
            {
              id: 3,
              type: "image",
              background: {
                id: 4,
                documentId: "bg",
                url: "/local/bg.webp",
                alternativeText: null,
              },
              responsive_image: {
                id: 5,
                documentId: "bg-res",
                url: "/local/bg-res.webp",
                alternativeText: null,
              },
            },
          ],
        }}
      />
      <ServicesSection />
      <CategorySection />
      <AboutUsSection />
      <HoverMarquee />
      <PopularGiftsSection />
      <LogoCloudSection />
      <StepsSection />
      <TestimonialSection />
      <FAQSection />
      <FooterCTASection />
    </main>
  );
}
