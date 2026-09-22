import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { StepsBlock } from "@/payload-types";
import Image from "next/image";
import { isImage } from "payload/shared";
const StepsCarousel = ({ steps }: { steps: StepsBlock["steps"] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-16"
    >
      <CarouselContent>
        {steps.map((data, index) => (
          <CarouselItem key={data.id} className="basis-1/1 lg:basis-[40%]">
            <div className="flex items-center gap-6">
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
                <span className="font-anton text-4xl uppercase block">
                  0{index + 1}
                </span>
                <span className="block mb-1 mt-4 font-semibold">
                  {data.title}
                </span>
                <p className="text-[#414651] text-sm">{data.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        size="icon-lg"
        className="-top-[calc(100%+4.5rem)] lg:-top-[calc(100%+9rem)] left-auto right-12 bg-transparent border-black text-black hover:bg-primary hover:text-white hover:border-primary"
      />
      <CarouselNext
        size="icon-lg"
        className="-top-[calc(100%+4.5rem)] lg:-top-[calc(100%+9rem)] right-0 bg-transparent border-black text-black hover:bg-primary hover:text-white hover:border-primary"
      />
    </Carousel>
  );
};

export default StepsCarousel;
