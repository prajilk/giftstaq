import { ProductRecommendationsResponse } from "@/lib/shopify/types";

export async function fetchRecommendationsFromApi(
  productId: string,
): Promise<ProductRecommendationsResponse> {
  const res = await fetch(
    `/api/products/recommendations?productId=${encodeURIComponent(productId)}`,
  );
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}
