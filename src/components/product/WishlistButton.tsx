"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import type { ProductSummary } from "@/lib/types";

export default function WishlistButton({
  product,
  className = "",
  variant = "floating",
}: {
  product: ProductSummary;
  className?: string;
  variant?: "floating" | "outline";
}) {
  const hydrated = useHydrated();
  const saved = useWishlist((s) => s.items.some((p) => p.id === product.id)) && hydrated;
  const toggle = useWishlist((s) => s.toggle);

  const base =
    variant === "floating"
      ? "size-10 rounded-full grid place-items-center text-black/80 hover:bg-white/60 backdrop-blur-sm"
      : "size-14 rounded-full grid place-items-center border border-line hover:border-fg";

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.title} from saved` : `Save ${product.title}`}
      className={`${base} transition-colors ${className}`}
      onClick={() => {
        const nowSaved = toggle(product);
        toast(nowSaved ? "Saved for later" : "Removed from saved", { description: product.title });
      }}
    >
      <motion.span
        key={String(saved)}
        initial={hydrated ? { scale: 0.5 } : false}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 12 }}
      >
        <Heart className={`size-5 ${saved ? "fill-accent text-accent" : ""}`} strokeWidth={1.75} />
      </motion.span>
    </button>
  );
}
