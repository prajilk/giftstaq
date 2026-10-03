export type SortValue = "latest" | "price-low-to-high" | "price-high-to-low";

export const SORT_MAP: Record<
  SortValue,
  { sortKey: string; reverse: boolean }
> = {
  latest: { sortKey: "CREATED_AT", reverse: true }, // newest first
  "price-low-to-high": { sortKey: "PRICE", reverse: false },
  "price-high-to-low": { sortKey: "PRICE", reverse: true },
};

export const COLLECTION_SORT_MAP: Record<
  SortValue,
  { sortKey: string; reverse: boolean }
> = {
  latest: { sortKey: "CREATED", reverse: true }, // 👈 CREATED, not CREATED_AT
  "price-low-to-high": { sortKey: "PRICE", reverse: false },
  "price-high-to-low": { sortKey: "PRICE", reverse: true },
};
