import { ProductByHandleResponse, ProductsResponse } from "@/lib/shopify/types";

export async function fetchProductsFromApi(
  first = 12,
  after?: string,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ first: String(first) });
  if (after) params.set("after", after);

  const res = await fetch(`/api/products?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function fetchProductByHandle(
  handle: string,
): Promise<ProductByHandleResponse> {
  const res = await fetch(`/api/products/${handle}`);

  if (res.status === 404) {
    throw new Error("PRODUCT_NOT_FOUND");
  }
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
