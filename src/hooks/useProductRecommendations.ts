import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationsFromApi } from "@/lib/api/recommendations";
import { recommendationKeys } from "@/lib/query/keys";

export function useProductRecommendations(productId: string) {
  return useQuery({
    queryKey: recommendationKeys.forProduct(productId),
    queryFn: () => fetchRecommendationsFromApi(productId),
    enabled: Boolean(productId),
  });
}
