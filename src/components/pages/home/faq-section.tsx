import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import type { FaqBlock } from "@/payload-types";

const FAQSection = ({ description, faqs, heading, link }: FaqBlock) => {
  if (!faqs) return null;
  return (
    <section className="container container-padding-x py-12 lg:py-16 grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h1 className="text-3xl lg:text-4xl font-anton uppercase">{heading}</h1>
        <p className="max-w-lg">{description}</p>
        <Link
          href={link.href}
          className="hidden lg:block"
          target={link.isExternal ? "_blank" : "_self"}
        >
          <Button>{link.label}</Button>
        </Link>
      </div>

      <Accordion
        defaultValue={[faqs[0].question.toLowerCase().replaceAll(" ", "-")]}
        className="max-w-lg"
      >
        {faqs.map((item) => (
          <AccordionItem
            value={item.question.toLowerCase().replaceAll(" ", "-")}
            key={item.id}
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
