import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductSummary } from "@/lib/types";

interface WishlistState {
  items: ProductSummary[];
  toggle: (product: ProductSummary) => boolean;
  remove: (id: number) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const saved = get().items.some((p) => p.id === product.id);
        set({ items: saved ? get().items.filter((p) => p.id !== product.id) : [product, ...get().items] });
        return !saved;
      },
      remove: (id) => set((s) => ({ items: s.items.filter((p) => p.id !== id) })),
    }),
    { name: "easystore-wishlist" },
  ),
);
