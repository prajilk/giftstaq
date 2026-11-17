import { shopifyClient } from "./client";
import { SEARCH_PRODUCTS_QUERY } from "./queries";
import { ProductsResponse } from "./types";

export function buildSearchQuery(term: string): string {
  const words = term
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^-+|-+$/g, "")) // a leading "-" would mean "exclude" in Shopify
    .filter(Boolean)
    .slice(0, 6);

  return words.map((w) => `(title:${w}* OR tag:${w}*)`).join(" AND ");
}

export async function searchProducts(term: string, first = 10, after?: string) {
  const query = buildSearchQuery(term);
  return shopifyClient.request<ProductsResponse>(SEARCH_PRODUCTS_QUERY, {
    query,
    first,
    after,
  });
}
