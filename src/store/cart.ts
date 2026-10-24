import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductSummary } from "@/lib/types";

export interface CartLine {
  product: ProductSummary;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  add: (product: ProductSummary, quantity?: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (product, quantity = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.product.id === product.id);
          if (!existing) return { lines: [...s.lines, { product, quantity: Math.min(quantity, product.stock) }] };
          return {
            lines: s.lines.map((l) =>
              l.product.id === product.id ? { ...l, quantity: Math.min(l.quantity + quantity, product.stock) } : l,
            ),
          };
        }),
      setQuantity: (id, quantity) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.product.id === id ? { ...l, quantity: Math.max(1, Math.min(quantity, l.product.stock)) } : l,
          ),
        })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.product.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "easystore-cart", version: 2 },
  ),
);

export const selectCount = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);
export const selectSubtotal = (s: CartState) => s.lines.reduce((n, l) => n + l.product.price * l.quantity, 0);
export const selectSavings = (s: CartState) =>
  s.lines.reduce((n, l) => n + (l.product.compareAt ? (l.product.compareAt - l.product.price) * l.quantity : 0), 0);
