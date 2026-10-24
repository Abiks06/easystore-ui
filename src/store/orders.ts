import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./cart";

export type PaymentMethod = "momo" | "card-on-delivery" | "cash";
export type FulfilmentMethod = "delivery" | "pickup";

export interface Order {
  id: string;
  placedAt: string;
  lines: CartLine[];
  subtotal: number;
  delivery: number;
  total: number;
  contact: { name: string; email: string; phone: string };
  fulfilment: { method: FulfilmentMethod; address?: string; city?: string; region?: string };
  payment: { method: PaymentMethod; network?: string };
}

interface OrdersState {
  orders: Order[];
  place: (order: Omit<Order, "id" | "placedAt">) => Order;
  /** Remembered so returning shoppers don't retype their details. */
  profile: Order["contact"] | null;
}

function orderId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "ES-" + Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      profile: null,
      place: (draft) => {
        const order = { ...draft, id: orderId(), placedAt: new Date().toISOString() };
        set((s) => ({ orders: [order, ...s.orders], profile: draft.contact }));
        return order;
      },
    }),
    { name: "easystore-orders" },
  ),
);
