import { shopifyClient } from "./client";
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
) {
  return shopifyClient.request<CollectionByHandleResponse>(
    GET_COLLECTION_BY_HANDLE_QUERY,
    { handle, first, after, sortKey, reverse },
  );
}
