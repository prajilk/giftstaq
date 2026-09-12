import { shopifyClient } from "./client";
import { CREATE_CART_MUTATION } from "./queries";
import { CreateCartResponse } from "./types";

export async function createCart(variantId: string, quantity: number) {
  return shopifyClient.request<CreateCartResponse>(CREATE_CART_MUTATION, {
    lines: [{ merchandiseId: variantId, quantity }],
  });
}
