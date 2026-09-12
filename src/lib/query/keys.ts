export const productKeys = {
  all: ["products"] as const,
  list: (first: number) => [...productKeys.all, "list", first] as const,
  detail: (handle: string) => [...productKeys.all, "detail", handle] as const,
};

export const cartKeys = {
  all: ["cart"] as const,
};
