import { useCollectionProducts } from "./useCollectionProducts";
import { toProductCard } from "@/lib/shopify/transform";
import { SortValue } from "@/lib/shopify/sort";
import { ProductsListResult } from "@/lib/shopify/types";

export function useCollectionProductsList(
  handle: string,
  sort: SortValue,
): ProductsListResult {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCollectionProducts(handle, sort);

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
