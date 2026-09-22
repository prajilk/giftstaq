import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../pages/products/product-card";
import type { ProductCardData } from "@/lib/shopify/transform";

export function RelatedProductsCarousel({
  products,
}: {
  products: ProductCardData[];
}) {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full mt-12 hidden lg:block"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/1 md:basis-1/4 lg:basis-1/5"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          size="icon-lg"
          className="-top-[calc(100%+9rem)] left-auto right-12 bg-transparent border-black text-black hover:bg-primary hover:text-white hover:border-primary"
        />
        <CarouselNext
          size="icon-lg"
          className="-top-[calc(100%+9rem)] right-0 bg-transparent border-black text-black hover:bg-primary hover:text-white hover:border-primary"
        />
      </Carousel>

      <div className="lg:hidden grid grid-cols-2 gap-3 mt-12">
        {products.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
}
