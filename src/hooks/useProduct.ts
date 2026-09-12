// hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle } from "@/lib/api/products";
import { productKeys } from "@/lib/query/keys";

export function useProduct(handle: string) {
  return useQuery({
    queryKey: productKeys.detail(handle),
    queryFn: () => fetchProductByHandle(handle),
  });
}
