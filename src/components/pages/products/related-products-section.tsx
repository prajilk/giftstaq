import { RelatedProductsCarousel } from "@/components/carousel/related-products-carousel";

const RelatedProductsSection = () => {
  return (
    <section className="bg-[#FCFBF9]">
      <div className="container container-padding-x py-12 lg:py-16">
        <h2 className="text-4xl font-anton uppercase">Related Products</h2>

        <RelatedProductsCarousel />
      </div>
    </section>
  );
};

export default RelatedProductsSection;
