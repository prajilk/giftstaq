"use server";

import { createCart } from "./lib/shopify/cart";
import { cookies } from "next/headers";
import { shopifyClient } from "./lib/shopify/client";
import { CartMutationResponse, GetCartResponse } from "./lib/shopify/types";
import {
  ADD_CART_LINES_MUTATION,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  REMOVE_CART_LINES_MUTATION,
  UPDATE_CART_LINES_MUTATION,
} from "./lib/shopify/queries";

const CART_COOKIE = "cart_id";

export async function createCartAction(variantId: string, quantity: number) {
  const data = await createCart(variantId, quantity);

  const { cart, userErrors } = data.cartCreate;

  if (userErrors.length > 0) {
    throw new Error(userErrors[0].message);
  }

  if (!cart) {
    throw new Error("Failed to create cart");
  }

  return { checkoutUrl: cart.checkoutUrl };
}

export async function addToCartAction(variantId: string, quantity: number) {
  const cookieStore = await cookies();
  const existingCartId = cookieStore.get(CART_COOKIE)?.value;

  if (existingCartId) {
    const data = await shopifyClient.request<CartMutationResponse>(
      ADD_CART_LINES_MUTATION,
      {
        cartId: existingCartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    );

    const result = data.cartLinesAdd!;
    if (result.userErrors.length > 0) {
      // Cart may have expired/been deleted server-side — fall back to creating a new one
      if (result.userErrors.some((e) => e.message.includes("does not exist"))) {
        return createNewCart(variantId, quantity);
      }
      throw new Error(result.userErrors[0].message);
    }

    return { cart: result.cart! };
  }

  return createNewCart(variantId, quantity);
}

async function createNewCart(variantId: string, quantity: number) {
  const data = await shopifyClient.request<CartMutationResponse>(
    CREATE_CART_MUTATION,
    {
      lines: [{ merchandiseId: variantId, quantity }],
    },
  );

  const result = data.cartCreate!;
  if (result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  const cart = result.cart!;
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cart.id, {
    maxAge: 60 * 60 * 24 * 30, // 30 days — matches Shopify's own cart expiry window
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { cart };
}

export async function getCartAction() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) return { cart: null };

  const data = await shopifyClient.request<GetCartResponse>(GET_CART_QUERY, {
    cartId,
  });
  return { cart: data.cart };
}

export async function updateCartLineAction(lineId: string, quantity: number) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No active cart");

  const data = await shopifyClient.request<CartMutationResponse>(
    UPDATE_CART_LINES_MUTATION,
    { cartId, lines: [{ id: lineId, quantity }] },
  );

  const result = data.cartLinesUpdate!;
  if (result.userErrors.length > 0)
    throw new Error(result.userErrors[0].message);

  return { cart: result.cart! };
}

export async function removeCartLineAction(lineId: string) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) throw new Error("No active cart");

  const data = await shopifyClient.request<CartMutationResponse>(
    REMOVE_CART_LINES_MUTATION,
    { cartId, lineIds: [lineId] },
  );

  const result = data.cartLinesRemove!;
  if (result.userErrors.length > 0)
    throw new Error(result.userErrors[0].message);

  return { cart: result.cart! };
}
