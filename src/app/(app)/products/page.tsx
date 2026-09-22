import FooterCTASection from "@/components/common/footer-cta-section";
import HeroSection from "@/components/pages/contact-us/hero-section";
import CategoryList from "@/components/pages/home/category-list";
import ProductsListingSection from "@/components/pages/products/products-listing-section";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query/get-query-client";
import { getProducts } from "@/lib/shopify/products";
import { productKeys } from "@/lib/query/keys";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { notFound } from "next/navigation";

const noop = () => {};

const ProductsPage = async () => {
  const queryClient = getQueryClient();

  // Runs on the server, fetches directly from Shopify (no self-HTTP-call)
  await queryClient
    .query({
      queryKey: productKeys.list(12),
      queryFn: () => getProducts(12),
    })
    .catch(noop); // don't crash SSR if Shopify is briefly down — client will retry

  const payload = await getPayload({ config: payloadConfig });

  const productListingPage = await payload.findGlobal({
    slug: "product-listing-page",
  });

  if (!productListingPage.layout) return notFound();

  return (
    <main>
      {productListingPage.layout?.map((block, index) => {
        switch (block.blockType) {
          case "simple-hero":
            return <HeroSection key={index} {...block} page="Products" />;

          default:
            return null;
        }
      })}
      <div className="container container-padding-x py-10">
        <CategoryList />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsListingSection />
      </HydrationBoundary>
      {productListingPage.layout?.map((block, index) => {
        switch (block.blockType) {
          case "footer-cta":
            return <FooterCTASection key={index} {...block} />;

          default:
            return null;
        }
      })}
    </main>
  );
};

export default ProductsPage;
