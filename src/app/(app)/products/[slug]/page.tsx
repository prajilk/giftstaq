import ProductDetailsSection from "@/components/pages/products/product-details-section";
import RelatedProductsSection from "@/components/pages/products/related-products-section";
import { getQueryClient } from "@/lib/query/get-query-client";
import { productKeys } from "@/lib/query/keys";
import { getProductByHandle } from "@/lib/shopify/products";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const queryClient = getQueryClient();

  const data = await queryClient
    .query({
      queryKey: productKeys.detail(slug),
      queryFn: () => getProductByHandle(slug),
    })
    .catch(() => null);

  // If the product genuinely doesn't exist, show Next.js's 404 page
  if (!data?.product) {
    notFound();
  }

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailsSection handle={slug} />
      </HydrationBoundary>
      <RelatedProductsSection productId={data?.product?.id} />
    </main>
  );
};

export default ProductDetailPage;
