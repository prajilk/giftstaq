import { SortValue } from "../shopify/sort";

export const productKeys = {
  all: ["products"] as const,
  list: (first: number, sort: SortValue) =>
    [...productKeys.all, "list", first, sort] as const,
  detail: (handle: string) => [...productKeys.all, "detail", handle] as const,
};

export const cartKeys = {
  all: ["cart"] as const,
};

export const collectionKeys = {
  all: ["collections"] as const,
  list: (first: number) => [...collectionKeys.all, first] as const,
};

export const searchKeys = {
  all: ["search"] as const,
  query: (term: string) => [...searchKeys.all, term] as const,
};

export const recommendationKeys = {
  all: ["recommendations"] as const,
  forProduct: (productId: string) =>
    [...recommendationKeys.all, productId] as const,
};

export const collectionProductKeys = {
  all: ["collection-products"] as const,
  list: (handle: string, first: number, sort: SortValue) =>
    [...collectionProductKeys.all, handle, first, sort] as const,
};
