import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCollectionFromApi } from "@/lib/api/collections";
import { collectionProductKeys } from "@/lib/query/keys";
import { COLLECTION_SORT_MAP, SortValue } from "@/lib/shopify/sort";

const PAGE_SIZE = 12;

export function useCollectionProducts(
  handle: string,
  sort: SortValue = "latest",
) {
  const { sortKey, reverse } = COLLECTION_SORT_MAP[sort]; // reuse same map, or make a collection-specific one if sort keys differ

  return useInfiniteQuery({
    queryKey: collectionProductKeys.list(handle, PAGE_SIZE, sort),
    queryFn: ({ pageParam }) =>
      fetchCollectionFromApi(handle, PAGE_SIZE, pageParam, sortKey, reverse),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.collection?.products.pageInfo.hasNextPage
        ? (lastPage.collection.products.pageInfo.endCursor ?? undefined)
        : undefined,
    placeholderData: keepPreviousData,
    enabled: Boolean(handle),
  });
}
