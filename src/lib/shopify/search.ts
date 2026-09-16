import { shopifyClient } from "./client";
import { SEARCH_PRODUCTS_QUERY } from "./queries";
import { ProductsResponse } from "./types";

export async function searchProducts(term: string, first = 10) {
  // wrap in wildcard + search title/tag fields; empty term short-circuits before this runs anyway
  const query = `title:${term}* OR tag:${term}*`;

  return shopifyClient.request<ProductsResponse>(SEARCH_PRODUCTS_QUERY, {
    query,
    first,
  });
}
