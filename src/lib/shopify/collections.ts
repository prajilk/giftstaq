import { shopifyClient } from "./client";
import { GET_COLLECTIONS_QUERY } from "./queries";
import { CollectionsResponse } from "./types";

export async function getCollections(first = 6) {
  return shopifyClient.request<CollectionsResponse>(GET_COLLECTIONS_QUERY, {
    first,
  });
}
