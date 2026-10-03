// hooks/useProducts.ts
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductsFromApi } from "@/lib/api/products";
import { productKeys } from "@/lib/query/keys";
import { SORT_MAP, SortValue } from "@/lib/shopify/sort";

const PAGE_SIZE = 12;

export function useProducts(sort: SortValue = "latest") {
  const { sortKey, reverse } = SORT_MAP[sort];

  return useInfiniteQuery({
    queryKey: productKeys.list(PAGE_SIZE, sort),
    queryFn: ({ pageParam }) =>
      fetchProductsFromApi(PAGE_SIZE, pageParam, sortKey, reverse),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.products.pageInfo.hasNextPage
        ? (lastPage.products.pageInfo.endCursor ?? undefined)
        : undefined,
    placeholderData: keepPreviousData,
  });
}
