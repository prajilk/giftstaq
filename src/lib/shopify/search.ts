import { shopifyClient } from "./client";
import { SEARCH_PRODUCTS_QUERY } from "./queries";
import { ProductsResponse } from "./types";

export function buildSearchQuery(term: string): string {
  const raw = term.trim();

  const words = term
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 6);

  const textQuery = words
    .map((w) => `(title:${w}* OR tag:${w}*)`)
    .join(" AND ");

  // SKU-like input: no spaces, contains a digit, only SKU-safe characters
  if (/^[\w./-]{3,}$/.test(raw) && /\d/.test(raw)) {
    const parts = raw.split("-").filter(Boolean);

    // WBC-GS05-BLK becomes tag "WBC-GS05-BLK" OR tag "WBC-GS05".
    // It never searches a lone "WBC", which would match every product in the range.
    const tagQueries: string[] = [];
    for (let i = parts.length; i >= 2; i--) {
      tagQueries.push(`tag:"${parts.slice(0, i).join("-")}"`);
    }

    return [tagQueries.join(" OR "), textQuery && `(${textQuery})`]
      .filter(Boolean)
      .join(" OR ");
  }

  return textQuery;
}

export async function searchProducts(term: string, first = 10, after?: string) {
  const query = buildSearchQuery(term);
  return shopifyClient.request<ProductsResponse>(SEARCH_PRODUCTS_QUERY, {
    query,
    first,
    after,
  });
}
