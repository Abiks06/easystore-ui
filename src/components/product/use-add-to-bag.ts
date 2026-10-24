"use client";

import { toast } from "sonner";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import type { ProductSummary } from "@/lib/types";

export function useAddToBag() {
  const add = useCart((s) => s.add);
  const setCartOpen = useUI((s) => s.setCartOpen);

  return (product: ProductSummary, quantity = 1) => {
    const inBag = useCart.getState().lines.find((l) => l.product.id === product.id)?.quantity ?? 0;
    if (inBag >= product.stock) {
      toast.error(`That's all the ${product.title} we have`);
      return;
    }
    add(product, quantity);
    toast.success(`Added to bag`, {
      description: quantity > 1 ? `${quantity} × ${product.title}` : product.title,
      action: { label: "View bag", onClick: () => setCartOpen(true) },
    });
  };
}
