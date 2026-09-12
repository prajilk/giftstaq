import { useQuery } from "@tanstack/react-query";
import { fetchProductsFromApi } from "@/lib/api/products";
import { productKeys } from "@/lib/query/keys";

export function useProducts(first = 12) {
  return useQuery({
    queryKey: productKeys.list(first),
    queryFn: () => fetchProductsFromApi(first),
  });
}
