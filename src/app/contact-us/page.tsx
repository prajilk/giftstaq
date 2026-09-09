import FooterCTASection from "@/components/common/footer-cta-section";
import FAQSection from "@/components/pages/contact-us/faq-section";
import FormSection from "@/components/pages/contact-us/form-section";
import HeroSection from "@/components/pages/contact-us/hero-section";

const ContactUsPage = () => {
  return (
    <main>
      <HeroSection img="/local/chero.png" />
      <FormSection />
      <FAQSection />
      <FooterCTASection />
    </main>
  );
};

export default ContactUsPage;
