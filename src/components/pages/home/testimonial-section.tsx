import TestimonialCarousel from "@/components/carousel/testimonial-carousel";
import type { TestimonialBlock } from "@/payload-types";
import Image from "next/image";
import { isImage } from "payload/shared";

const TestimonialSection = ({
  description,
  heading,
  image,
  testimonials,
}: TestimonialBlock) => {
  if (!testimonials) return null;
  return (
    <section className="bg-secondary">
      <div className="container container-padding-x py-12 lg:py-16 pb-24 lg:pb-16 grid lg:grid-cols-2">
        {typeof image !== "string" &&
          image.mimeType &&
          isImage(image.mimeType) &&
          image.url && (
            <Image
              src={image.url}
              alt={image.alt}
              width={400}
              height={400}
              className="hidden lg:block rounded-xl object-cover w-[80%] aspect-square"
            />
          )}

        <div className="space-y-4">
          <h3 className="text-3xl lg:text-4xl font-anton uppercase max-w-sm">
            {heading}
          </h3>
          <p className="max-w-lg">{description}</p>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
