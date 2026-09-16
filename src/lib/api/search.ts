import { ProductsResponse } from "@/lib/shopify/types";

export async function searchProductsFromApi(
  query: string,
  first = 10,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ q: query, first: String(first) });
  const res = await fetch(`/api/search?${params.toString()}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}
