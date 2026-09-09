import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const dummyData = [
  {
    id: 1,
    title: "Choose Products",
    description:
      "Browse our curated collection and find the perfect gifts for your employees, clients, or events.",
    image: "/local/steps/step1.webp",
  },
  {
    id: 2,
    title: "Customize Branding",
    description:
      "Add your logo, brand colors, custom packaging, and personalized messaging.",
    image: "/local/steps/step2.webp",
  },
  {
    id: 3,
    title: "Place Your Order",
    description:
      "Review your selections, approve the design, and confirm your order with ease.",
    image: "/local/steps/step3.webp",
  },
  {
    id: 4,
    title: "We Deliver",
    description:
      "We carefully pack and deliver your branded gifts to recipients, on time and with care.",
    image: "/local/steps/step4.webp",
  },
];

const StepsCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-16"
    >
      <CarouselContent>
        {dummyData.map((data, index) => (
          <CarouselItem key={data.id} className="basis-1/1 lg:basis-[40%]">
            <div className="flex items-center gap-6">
              <Image
                src={data.image}
                alt={"Image"}
                width={200}
                height={200}
                className="rounded-md object-cover aspect-square shrink-0"
              />

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
