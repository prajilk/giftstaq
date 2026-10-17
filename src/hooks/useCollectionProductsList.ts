import { useCollectionProducts } from "./useCollectionProducts";
import { toProductCard } from "@/lib/shopify/transform";
import { SortValue } from "@/lib/shopify/sort";
import { ProductsListResult } from "@/lib/shopify/types";
import { ProductFilters } from "@/lib/shopify/filters";

export function useCollectionProductsList(
  handle: string,
  sort: SortValue,
  filters: ProductFilters,
): ProductsListResult {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCollectionProducts(handle, sort, filters);

  const products = (data?.pages ?? []).flatMap((page) =>
    (page.collection?.products.edges ?? []).map(({ node }) =>
      toProductCard(node),
    ),
  );

  return {
    products,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}
