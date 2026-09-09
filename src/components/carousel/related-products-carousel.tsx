import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../pages/products/product-card";

const dummyData = [
  {
    id: 1,
    title: "Custom Branded T-Shirts",
    description: "High-quality custom apparel designed to showcase your brand.",
    image: "/local/products/1.webp",
  },
  {
    id: 2,
    title: "Laptop Sleeve",
    description:
      "Protect laptops with a sleek, durable sleeve for work and travel.",
    image: "/local/products/2.webp",
  },
  {
    id: 3,
    title: "Insulated Water Bottle",
    description:
      "A stylish insulated bottle that keeps drinks fresh while showcasing your brand.",
    image: "/local/products/3.webp",
  },
  {
    id: 4,
    title: "Portable Bluetooth Speaker",
    description:
      "Compact wireless speakers delivering impressive sound and lasting brand impact.",
    image: "/local/products/4.webp",
  },
  {
    id: 5,
    title: "Portable Bluetooth Speaker",
    description:
      "Compact wireless speakers delivering impressive sound and lasting brand impact.",
    image: "/local/products/5.webp",
  },
  {
    id: 6,
    title: "Portable Bluetooth Speaker",
    description:
      "Compact wireless speakers delivering impressive sound and lasting brand impact.",
    image: "/local/products/6.webp",
  },
];

export function RelatedProductsCarousel() {
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
          {dummyData.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/1 md:basis-1/4 lg:basis-1/5"
            >
              <ProductCard
                crane_capacity={"10"}
                image={"/local/products/7.webp"}
                listingType={"rent"}
                max_lifting_height={"10"}
                max_working_radius={"10"}
                title={
                  "Premium Quarter-Zip Performance Pullover for Corporate Teams"
                }
              />
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
        {dummyData.map((item) => (
          <ProductCard
            crane_capacity={"10"}
            image={"/local/products/7.webp"}
            listingType={"rent"}
            max_lifting_height={"10"}
            max_working_radius={"10"}
            title={
              "Premium Quarter-Zip Performance Pullover for Corporate Teams"
            }
            key={item.id}
          />
        ))}
      </div>
    </>
  );
}
