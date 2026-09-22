import FooterCTASection from "@/components/common/footer-cta-section";
import FAQSection from "@/components/pages/contact-us/faq-section";
import FormSection from "@/components/pages/contact-us/form-section";
import HeroSection from "@/components/pages/contact-us/hero-section";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const ContactUsPage = async () => {
  const payload = await getPayload({ config });

  const contactPage = await payload.findGlobal({
    slug: "contact-page",
  });

  if (!contactPage.layout) return notFound();
  return (
    <main>
      {contactPage.layout?.map((block, index) => {
        switch (block.blockType) {
          case "simple-hero":
            return <HeroSection key={index} {...block} />;

          case "form":
            return <FormSection key={index} {...block} />;

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
};

export default ContactUsPage;
