import { ProductsCarousel } from "@/components/carousel/products-carousel";
import type { PopularGiftBlock } from "@/payload-types";

const PopularGiftsSection = ({
  cards,
  description,
  heading,
}: PopularGiftBlock) => {
  if (!cards) return null;
  return (
    <section className="bg-[rgb(226,213,196)]">
      <div className="container container-padding-x py-12 lg:py-16 space-y-5">
        <h1 className="text-3xl lg:text-4xl font-anton uppercase max-w-lg">
          {heading}
        </h1>
        <p className="max-w-156">{description}</p>

        <ProductsCarousel cards={cards} />
      </div>
    </section>
  );
};

export default PopularGiftsSection;
