import TestimonialCarousel from "@/components/carousel/testimonial-carousel";
import Image from "next/image";

const TestimonialSection = () => {
  return (
    <section className="bg-secondary">
      <div className="container container-padding-x py-12 lg:py-16 pb-24 lg:pb-16 grid lg:grid-cols-2">
        <Image
          src="/local/img1.webp"
          alt="Image"
          width={400}
          height={400}
          className="hidden lg:block rounded-xl object-cover w-[80%] aspect-square"
        />

        <div className="space-y-4">
          <h3 className="text-3xl lg:text-4xl font-anton uppercase max-w-sm">
            Trusted by business, loved by recipients
          </h3>
          <p className="max-w-lg">
            See how Giftstag helps businesses create memorable gifting
            experiences that strengthen relationships and leave a lasting
            impression.
          </p>

          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
