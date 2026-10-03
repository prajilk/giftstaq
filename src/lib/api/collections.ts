import { CollectionByHandleResponse } from "@/lib/shopify/types";
import { CollectionsResponse } from "@/lib/shopify/types";

export async function fetchCollectionsFromApi(
  first = 6,
): Promise<CollectionsResponse> {
  const res = await fetch(`/api/collections?first=${first}`);
  if (!res.ok) throw new Error("Failed to fetch collections");
  return res.json();
}

export async function fetchCollectionFromApi(
  handle: string,
  first = 12,
  after?: string,
  sortKey = "COLLECTION_DEFAULT",
  reverse = false,
): Promise<CollectionByHandleResponse> {
  const params = new URLSearchParams({
    first: String(first),
    sortKey,
    reverse: String(reverse),
  });
  if (after) params.set("after", after);

  const res = await fetch(`/api/collections/${handle}?${params.toString()}`);
  if (res.status === 404) throw new Error("COLLECTION_NOT_FOUND");
  if (!res.ok) throw new Error("Failed to fetch collection");
  return res.json();
}
