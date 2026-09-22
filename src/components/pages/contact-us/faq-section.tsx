import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqBlock } from "@/payload-types";

const FAQSection = ({ description, faqs, heading }: FaqBlock) => {
  return (
    <section className="bg-secondary">
      <div className="container container-padding-x py-12 lg:py-16 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-anton uppercase">{heading}</h1>
        <p className="pt-2 py-10 max-w-lg text-center font-medium">
          {description}
        </p>

        <Accordion
          defaultValue={[faqs[0].question.toLowerCase().replaceAll(" ", "-")]}
          className="max-w-2xl"
        >
          {faqs.map((item) => (
            <AccordionItem
              value={item.question.toLowerCase().replaceAll(" ", "-")}
              key={item.id}
              className="bg-white"
            >
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
