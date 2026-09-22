import { shopifyClient } from "./client";
import { GET_PRODUCT_RECOMMENDATIONS_QUERY } from "./queries";
import { ProductRecommendationsResponse } from "./types";

export async function getProductRecommendations(productId: string) {
  return shopifyClient.request<ProductRecommendationsResponse>(
    GET_PRODUCT_RECOMMENDATIONS_QUERY,
    { productId },
  );
}
