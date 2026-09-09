import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="bg-secondary">
      <div className="container container-padding-x py-12 lg:py-16 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-anton uppercase">
          Frequently Asked Questions
        </h1>
        <p className="pt-2 py-10 max-w-lg text-center font-medium">
          Discover our most-trusted equipment, from high-performance power tools
          to essential home hardware.
        </p>

        <Accordion defaultValue={["shipping"]} className="max-w-2xl">
          <AccordionItem value="shipping" className="bg-white">
            <AccordionTrigger>
              Do you offer a warranty on products?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all our products come with a comprehensive manufacturer
              warranty. As an authorized distributor for brands like Bosch and
              Makita, we ensure your purchase is protected against defects,
              providing you with long-term peace of mind and dedicated
              after-sales technical support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns" className="bg-white">
            <AccordionTrigger>
              What locations do you deliver to?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all our products come with a comprehensive manufacturer
              warranty. As an authorized distributor for brands like Bosch and
              Makita, we ensure your purchase is protected against defects,
              providing you with long-term peace of mind and dedicated
              after-sales technical support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support" className="bg-white">
            <AccordionTrigger>
              Are all your products 100% genuine brands?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all our products come with a comprehensive manufacturer
              warranty. As an authorized distributor for brands like Bosch and
              Makita, we ensure your purchase is protected against defects,
              providing you with long-term peace of mind and dedicated
              after-sales technical support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support" className="bg-white">
            <AccordionTrigger>
              How do I choose the right product?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all our products come with a comprehensive manufacturer
              warranty. As an authorized distributor for brands like Bosch and
              Makita, we ensure your purchase is protected against defects,
              providing you with long-term peace of mind and dedicated
              after-sales technical support.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support" className="bg-white">
            <AccordionTrigger>
              What payment methods do you currently accept?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all our products come with a comprehensive manufacturer
              warranty. As an authorized distributor for brands like Bosch and
              Makita, we ensure your purchase is protected against defects,
              providing you with long-term peace of mind and dedicated
              after-sales technical support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
