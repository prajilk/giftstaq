import StepsCarousel from "@/components/carousel/steps-carousel";
import type { StepsBlock } from "@/payload-types";

const StepsSection = ({ heading, description, steps }: StepsBlock) => {
  if (!steps) return null;
  return (
    <section className="container container-padding-x py-12 lg:py-16 space-y-4">
      <h1 className="text-3xl lg:text-4xl font-anton uppercase">{heading}</h1>
      <p className="max-w-2xl">{description}</p>

      <StepsCarousel steps={steps} />
    </section>
  );
};

export default StepsSection;
