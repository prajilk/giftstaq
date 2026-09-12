"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, X } from "lucide-react";
import { useCart, useRemoveCartLine, useUpdateCartLine } from "@/hooks/useCart";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useCart();
  const updateLine = useUpdateCartLine();
  const removeLine = useRemoveCartLine();

  const cart = data?.cart;
  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size="icon"
            variant="secondary"
            className="relative bg-white cursor-pointer shadow lg:shadow-none"
          />
        }
      >
        <ShoppingCart />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent className="flex flex-col z-80">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-4 space-y-4 ps-5">
          {isLoading && <p className="text-sm text-gray-500">Loading...</p>}

          {!isLoading && lines.length === 0 && (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          )}

          {lines.map((line) => (
            <div key={line.id} className="flex gap-3 border-b pb-4">
              {line.merchandise.image && (
                <Image
                  src={line.merchandise.image.url}
                  alt={
                    line.merchandise.image.altText ||
                    line.merchandise.product.title
                  }
                  width={100}
                  height={100}
                  className="size-16 object-cover rounded"
                />
              )}

              <div className="flex-1">
                <p className="text-sm font-medium">
                  {line.merchandise.product.title}
                </p>
                <p className="text-xs text-gray-500">
                  {line.merchandise.title}
                </p>
                <p className="text-sm mt-1">
                  {line.merchandise.price.amount}{" "}
                  {line.merchandise.price.currencyCode}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateLine.mutate({
                        lineId: line.id,
                        quantity: Math.max(1, line.quantity - 1),
                      })
                    }
                    disabled={updateLine.isPending || line.quantity <= 1}
                    className="border rounded p-1 disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm w-4 text-center">
                    {line.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateLine.mutate({
                        lineId: line.id,
                        quantity: line.quantity + 1,
                      })
                    }
                    disabled={updateLine.isPending}
                    className="border rounded p-1 disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeLine.mutate(line.id)}
                disabled={removeLine.isPending}
                className="text-gray-400 hover:text-black"
                aria-label="Remove item"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {cart && lines.length > 0 && (
          <SheetFooter className="flex-col gap-3 sm:flex-col border-t pt-4">
            <div className="flex justify-between w-full text-sm font-medium">
              <span>Subtotal</span>
              <span>
                {cart.cost.totalAmount.amount}{" "}
                {cart.cost.totalAmount.currencyCode}
              </span>
            </div>
            <Link
              href={cart.checkoutUrl}
              className="w-full bg-black text-white text-center py-3 rounded"
            >
              Checkout
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
