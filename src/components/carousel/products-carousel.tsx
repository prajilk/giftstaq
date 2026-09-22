import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PopularGiftBlock } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { isImage } from "payload/shared";

export function ProductsCarousel({
  cards,
}: {
  cards: PopularGiftBlock["cards"];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full mt-12"
    >
      <CarouselContent>
        {cards.map((item) => (
          <CarouselItem
            key={item.id || item.title}
            className="basis-[80%] md:basis-1/3 lg:basis-1/4"
          >
            <Link href={item.link}>
              <div className="group space-y-2 bg-white rounded-xl p-2">
                <div className="bg-secondary flex items-center justify-center w-full aspect-square rounded-lg overflow-hidden">
                  {typeof item.image !== "string" &&
                    item.image.mimeType &&
                    isImage(item.image.mimeType) &&
                    item.image.url && (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt}
                        width={150}
                        height={150}
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                </div>
                <div className="px-2 py-1 space-y-1.5">
                  <h5 className="font-semibold">{item.title}</h5>
                  <p className="text-[13px] text-[#414651] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
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
}
