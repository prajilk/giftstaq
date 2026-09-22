"use client";

import { RelatedProductsCarousel } from "@/components/carousel/related-products-carousel";
import { useProductRecommendations } from "@/hooks/useProductRecommendations";
import { toProductCard } from "@/lib/shopify/transform";

const RelatedProductsSection = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useProductRecommendations(productId);

  const products = (data?.productRecommendations ?? []).map(toProductCard);

  if (isLoading) return null; // avoid layout jump / spinner for a below-the-fold section
  if (products.length === 0) return null; // some products just won't have recommendations — hide the section entirely

  return (
    <section className="bg-[#FCFBF9]">
      <div className="container container-padding-x py-12 lg:py-16">
        <h2 className="text-4xl font-anton uppercase">Related Products</h2>

        <RelatedProductsCarousel products={products} />
      </div>
    </section>
  );
};

export default RelatedProductsSection;
