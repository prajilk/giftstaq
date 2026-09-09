import { ProductsCarousel } from "@/components/carousel/products-carousel";

const PopularGiftsSection = () => {
  return (
    <section className="bg-[rgb(226,213,196)]">
      <div className="container container-padding-x py-12 lg:py-16 space-y-5">
        <h1 className="text-3xl lg:text-4xl font-anton uppercase max-w-lg">
          Our most popular corporate gifts
        </h1>
        <p className="max-w-156">
          Discover the products businesses love most. From everyday essentials
          to premium gift sets, these best sellers are perfect for creating
          memorable gifting experiences.
        </p>

        <ProductsCarousel />
      </div>
    </section>
  );
};

export default PopularGiftsSection;
