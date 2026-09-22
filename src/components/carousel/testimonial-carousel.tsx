import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Quote from "../icons/quote";
import type { TestimonialBlock } from "@/payload-types";
import { isImage } from "payload/shared";

const TestimonialCarousel = ({
  testimonials,
}: {
  testimonials: TestimonialBlock["testimonials"];
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-8 lg:mt-16"
    >
      <CarouselContent>
        {testimonials.map((data, i) => (
          <CarouselItem key={data.id || i} className="basis-full">
            <div className="flex flex-col md:flex-row gap-6">
              {typeof data.image !== "string" &&
                data.image.mimeType &&
                isImage(data.image.mimeType) &&
                data.image.url && (
                  <Image
                    src={data.image.url}
                    alt={data.image.alt}
                    width={200}
                    height={200}
                    className="rounded-md object-cover aspect-square shrink-0"
                  />
                )}

              <div>
                <Quote />
                <p className="mt-3 font-medium">{data.testimonial}</p>

                <div className="flex flex-col mt-3">
                  <span className="font-medium">{data.name}</span>
                  <span className="text-[#414651] text-sm">
                    {data.designation}
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        size="icon-lg"
        className="top-auto -bottom-14 left-0 bg-transparent border-black text-black hover:bg-primary hover:text-white hover:border-primary"
      />
      <CarouselNext
        size="icon-lg"
        className="top-auto -bottom-14 left-12 bg-transparent border-black text-black hover:bg-primary hover:text-white hover:border-primary"
      />
    </Carousel>
  );
};

export default TestimonialCarousel;
