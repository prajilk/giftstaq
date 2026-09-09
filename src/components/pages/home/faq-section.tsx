import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const FAQSection = () => {
  return (
    <section className="container container-padding-x py-12 lg:py-16 grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h1 className="text-3xl lg:text-4xl font-anton uppercase">
          Frequently Asked Questions
        </h1>
        <p className="max-w-lg">
          Discover our most-trusted equipment, from high-performance power tools
          to essential home hardware.
        </p>
        <Link href="/contact-us" className="hidden lg:block">
          <Button>Contact Sales</Button>
        </Link>
      </div>

      <Accordion defaultValue={["shipping"]} className="max-w-lg">
        <AccordionItem value="shipping">
          <AccordionTrigger>
            Do you offer a warranty on products?
          </AccordionTrigger>
          <AccordionContent>
            Yes, all our products come with a comprehensive manufacturer
            warranty. As an authorized distributor for brands like Bosch and
            Makita, we ensure your purchase is protected against defects,
            providing you with long-term peace of mind and dedicated after-sales
            technical support.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>What locations do you deliver to?</AccordionTrigger>
          <AccordionContent>
            Yes, all our products come with a comprehensive manufacturer
            warranty. As an authorized distributor for brands like Bosch and
            Makita, we ensure your purchase is protected against defects,
            providing you with long-term peace of mind and dedicated after-sales
            technical support.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>
            Are all your products 100% genuine brands?
          </AccordionTrigger>
          <AccordionContent>
            Yes, all our products come with a comprehensive manufacturer
            warranty. As an authorized distributor for brands like Bosch and
            Makita, we ensure your purchase is protected against defects,
            providing you with long-term peace of mind and dedicated after-sales
            technical support.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>
            How do I choose the right product?
          </AccordionTrigger>
          <AccordionContent>
            Yes, all our products come with a comprehensive manufacturer
            warranty. As an authorized distributor for brands like Bosch and
            Makita, we ensure your purchase is protected against defects,
            providing you with long-term peace of mind and dedicated after-sales
            technical support.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>
            What payment methods do you currently accept?
          </AccordionTrigger>
          <AccordionContent>
            Yes, all our products come with a comprehensive manufacturer
            warranty. As an authorized distributor for brands like Bosch and
            Makita, we ensure your purchase is protected against defects,
            providing you with long-term peace of mind and dedicated after-sales
            technical support.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;
