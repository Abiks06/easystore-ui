import { Minus, Plus, Star } from "lucide-react";
import { formatPrice } from "@/lib/format";

export function Price({
  price,
  compareAt,
  size = "md",
}: {
  price: number;
  compareAt?: number | null;
  size?: "sm" | "md" | "lg";
}) {
  const main = { sm: "text-sm", md: "text-base", lg: "text-3xl md:text-4xl" }[size];
  return (
    <span className="inline-flex items-baseline gap-2 tabular-nums">
      <span className={`${main} font-medium ${compareAt ? "text-accent" : ""}`}>{formatPrice(price)}</span>
      {compareAt && (
        <s className={`${size === "lg" ? "text-lg" : "text-xs"} text-muted decoration-1`}>{formatPrice(compareAt)}</s>
      )}
    </span>
  );
}

export function Rating({
  value,
  count,
  size = "sm",
  inverse = false,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  /** For use on dark (ink) surfaces. */
  inverse?: boolean;
}) {
  const px = size === "sm" ? "size-3" : "size-4";
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <span className="relative inline-flex" aria-hidden>
        <span className={`flex gap-0.5 ${inverse ? "text-bg/25" : "text-line"}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`${px} fill-current`} strokeWidth={0} />
          ))}
        </span>
        <span className={`absolute inset-0 flex gap-0.5 overflow-hidden ${inverse ? "text-bg" : "text-fg"}`} style={{ width: `${(value / 5) * 100}%` }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`${px} fill-current shrink-0`} strokeWidth={0} />
          ))}
        </span>
      </span>
      <span className={`${size === "sm" ? "text-xs" : "text-sm"} ${inverse ? "text-bg/60" : "text-muted"} tabular-nums`}>
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </span>
  );
}

export function QuantityStepper({
  value,
  max,
  onChange,
  size = "md",
}: {
  value: number;
  max: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-8" : "h-12";
  const w = size === "sm" ? "w-8" : "w-11";
  return (
    <div className={`inline-flex items-center rounded-full border border-line ${h}`}>
      <button
        type="button"
        className={`${w} h-full grid place-items-center rounded-full hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="min-w-6 text-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={`${w} h-full grid place-items-center rounded-full hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
