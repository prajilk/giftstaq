export const ALLOWED_SUSTAINABILITY = [
  "RPET",
  "Recycled",
  "Natural",
  "Made in UAE",
];

// Slider limits in AED.
export const PRICE_MIN = 0;
export const PRICE_MAX = 1000;

export type ProductFilters = {
  sustainability: string[];
  price: { min: number; max: number } | null; // null = no price filter
};

export const EMPTY_FILTERS: ProductFilters = {
  sustainability: [],
  price: null,
};

// Reads the URL params in the route handler. The route is public, so validate everything.
export function parseFilters(params: URLSearchParams): ProductFilters {
  const sustainability = (params.get("sustainability") ?? "")
    .split(",")
    .filter((v) => ALLOWED_SUSTAINABILITY.includes(v));

  const min = Number(params.get("minPrice"));
  const max = Number(params.get("maxPrice"));
  const hasPrice =
    params.has("minPrice") &&
    params.has("maxPrice") &&
    Number.isFinite(min) &&
    Number.isFinite(max) &&
    min >= 0 &&
    max >= min;

  return { sustainability, price: hasPrice ? { min, max } : null };
}

export function buildProductFilters(filters: ProductFilters) {
  const result: object[] = filters.sustainability.map((value) => ({
    productMetafield: { namespace: "custom", key: "sustainability", value },
  }));
  if (filters.price) result.push({ price: filters.price });
  return result;
}
