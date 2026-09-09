import StepsCarousel from "@/components/carousel/steps-carousel";

const StepsSection = () => {
  return (
    <section className="container container-padding-x py-12 lg:py-16 space-y-4">
      <h1 className="text-3xl lg:text-4xl font-anton uppercase">
        Gifting in four easy steps
      </h1>
      <p className="max-w-2xl">
        From selecting products to doorstep delivery, Gifting makes corporate
        gifting quick, simple, and hassle-free.
      </p>

      <StepsCarousel />
    </section>
  );
};

export default StepsSection;
