export const FREE_DELIVERY_THRESHOLD = 500;
export const DELIVERY_FEE = 35;

const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const cents = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatPrice(amount: number) {
  return `GH₵${Number.isInteger(amount) ? whole.format(amount) : cents.format(amount)}`;
}

export function deliveryFee(subtotal: number, method: "delivery" | "pickup" = "delivery") {
  if (method === "pickup" || subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return DELIVERY_FEE;
}

export function pluralize(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
