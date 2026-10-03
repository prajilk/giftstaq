"use client";

import { useCollectionProducts } from "@/hooks/useCollectionProducts";
import { toCollectionHero } from "@/lib/shopify/transform";
import HeroSection from "../contact-us/hero-section";
import ProductsListingSection from "../products/products-listing-section";
import { useCollectionProductsList } from "@/hooks/useCollectionProductsList";

export default function CollectionPageContent({ handle }: { handle: string }) {
  const { data } = useCollectionProducts(handle, "latest");
  const collection = data?.pages[0]?.collection;

  if (!collection) return null; // page.tsx already guarantees existence via notFound()

  const hero = toCollectionHero(collection);

  return (
    <>
      <HeroSection
        title={hero.title}
        backgroundImage={{
          url: hero.image?.url || "/phero.webp",
          alt: hero.image?.altText || "Collection Hero",
          id: "collection-hero",
          mimeType: "image/webp",
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        }}
        description={hero.description || ""}
        blockType="simple-hero"
        page="Products"
      />
      <ProductsListingSection
        title={hero.title}
        useProductsHook={(sort) => useCollectionProductsList(handle, sort)}
      />
    </>
  );
}
