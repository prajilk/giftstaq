import { CollectionsResponse } from "@/lib/shopify/types";

export async function fetchCollectionsFromApi(
  first = 6,
): Promise<CollectionsResponse> {
  const res = await fetch(`/api/collections?first=${first}`);
  if (!res.ok) throw new Error("Failed to fetch collections");
  return res.json();
}
