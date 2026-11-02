"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { CategoryBlock, Media } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { isImage } from "payload/shared";

const CustomCategoryList = ({
  className,
  collections,
}: {
  className?: string;
  collections: CategoryBlock["collections"];
}) => {
  if (!collections?.length) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
      }}
      className={cn("relative w-full", className)}
    >
      <CarouselContent className="-ml-5 pb-3">
        {collections.map((collection, index) => (
          <CarouselItem
            key={`${collection.id} ${index}`}
            // auto margins center the row when it fits, and collapse to 0 when it overflows
            className={cn(
              "basis-1/4 md:basis-1/3 lg:basis-1/5 pl-5",
              index === 0 && "ml-auto",
              index === collections.length - 1 && "mr-auto",
            )}
          >
            <CategoryItem
              image={collection.image}
              title={collection.title}
              link={collection.link}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-2 hidden md:inline-flex bg-white" />
      <CarouselNext className="right-2 hidden md:inline-flex bg-white" />
    </Carousel>
  );
};

export default CustomCategoryList;

function CategoryItem({
  image,
  title,
  link,
}: {
  image: string | Media;
  title: string;
  link: string;
}) {
  return (
    <Link href={link} className="shrink-0 flex flex-col items-center gap-5">
      <div className="relative flex flex-col group bg-secondary rounded-xl w-22 h-24 md:w-56 md:h-64 overflow-hidden">
        <div className="relative flex items-center justify-center shrink-0 size-full">
          {image &&
            typeof image !== "string" &&
            image.mimeType &&
            isImage(image.mimeType) &&
            image.url && (
              <Image
                src={image.url}
                alt={image.alt || "Collection"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                loading="eager"
                unoptimized
              />
            )}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/3 backdrop-blur-md mask-[linear-gradient(to_top,black_30%,transparent)] [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent)]"></div>

        <div className="absolute z-10 bottom-0 uppercase font-medium text-sm w-full py-3 flex justify-center items-center text-white font-anton md:text-2xl">
          <span>{title}</span>
        </div>
      </div>
    </Link>
  );
}
