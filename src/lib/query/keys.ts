export const productKeys = {
  all: ["products"] as const,
  list: (first: number) => [...productKeys.all, "list", first] as const,
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
