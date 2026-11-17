import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { searchProductsFromApi } from "@/lib/api/search";
import { searchKeys } from "@/lib/query/keys";

const PAGE_SIZE = 60;

export function useSearchResults(term: string) {
  const trimmed = term.trim();

  return useInfiniteQuery({
    queryKey: searchKeys.results(trimmed),
    queryFn: ({ pageParam }) =>
      searchProductsFromApi(trimmed, PAGE_SIZE, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.products.pageInfo.hasNextPage
        ? (lastPage.products.pageInfo.endCursor ?? undefined)
        : undefined,
    enabled: trimmed.length > 1,
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
