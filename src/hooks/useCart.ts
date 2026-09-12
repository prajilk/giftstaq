// hooks/useCart.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartKeys } from "@/lib/query/keys";
import {
  getCartAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/actions";

export function useCart() {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: () => getCartAction(),
  });
}

export function useUpdateCartLine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ lineId, quantity }: { lineId: string; quantity: number }) =>
      updateCartLineAction(lineId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useRemoveCartLine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lineId: string) => removeCartLineAction(lineId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}
