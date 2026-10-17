import { shopifyClient } from "./client";
import { buildProductFilters, EMPTY_FILTERS, ProductFilters } from "./filters";
import {
  GET_COLLECTION_BY_HANDLE_QUERY,
  GET_COLLECTIONS_QUERY,
} from "./queries";
import { CollectionByHandleResponse, CollectionsResponse } from "./types";

export async function getCollections(first = 6) {
  return shopifyClient.request<CollectionsResponse>(GET_COLLECTIONS_QUERY, {
    first,
  });
}

export async function getCollectionByHandle(
  handle: string,
  first = 12,
  after?: string,
  sortKey = "COLLECTION_DEFAULT",
  reverse = false,
  filters: ProductFilters = EMPTY_FILTERS,
) {
  const productFilters = buildProductFilters(filters);
  return shopifyClient.request<CollectionByHandleResponse>(
    GET_COLLECTION_BY_HANDLE_QUERY,
    {
      handle,
      first,
      after,
      sortKey,
      reverse,
      filters: productFilters.length ? productFilters : undefined,
    },
  );
}
