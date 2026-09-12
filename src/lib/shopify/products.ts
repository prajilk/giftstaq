import { shopifyClient } from "./client";
import { GET_PRODUCT_BY_HANDLE_QUERY, GET_PRODUCTS_QUERY } from "./queries";
import { ProductByHandleResponse, ProductsResponse } from "./types";

export async function getProducts(first = 12, after?: string) {
  return shopifyClient.request<ProductsResponse>(GET_PRODUCTS_QUERY, {
    first,
    after,
  });
}

export async function getProductByHandle(handle: string) {
  return shopifyClient.request<ProductByHandleResponse>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
}
