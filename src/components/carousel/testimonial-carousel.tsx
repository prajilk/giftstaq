import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Quote from "../icons/quote";

const TestimonialCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-8 lg:mt-16"
    >
      <CarouselContent>
        {[1, 2, 3].map((data) => (
          <CarouselItem key={data} className="basis-full">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={"/local/img1.webp"}
                alt={""}
                width={200}
                height={200}
                className="rounded-md object-cover aspect-square shrink-0"
              />

              <div>
                <Quote />
                <p className="mt-3 font-medium">
                  See how Giftstaq helps businesses create memorable gifting
                  experiences that strengthen relationships and leave a lasting
                  impression.
                </p>

                <div className="flex flex-col mt-3">
                  <span className="font-medium">David Miller</span>
                  <span className="text-[#414651] text-sm">
                    Marketing Director
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
