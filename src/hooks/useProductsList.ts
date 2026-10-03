import { useProducts } from "./useProducts";
import { toProductCard } from "@/lib/shopify/transform";
import { SortValue } from "@/lib/shopify/sort";
import { ProductsListResult } from "@/lib/shopify/types";

export function useProductsList(sort: SortValue): ProductsListResult {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts(sort);

  const products = (data?.pages ?? []).flatMap((page) =>
    page.products.edges.map(({ node }) => toProductCard(node)),
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
