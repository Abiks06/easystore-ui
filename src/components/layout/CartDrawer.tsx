"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { selectCount, selectSavings, selectSubtotal, useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { categoryTile } from "@/lib/categories";
import { FREE_DELIVERY_THRESHOLD, formatPrice } from "@/lib/format";
import { Price, QuantityStepper } from "@/components/product/bits";

export default function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const setOpen = useUI((s) => s.setCartOpen);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const closeRef = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60" role="dialog" aria-modal="true" aria-label="Your bag">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            className="absolute right-0 top-0 h-full w-full sm:w-[440px] bg-bg shadow-2xl flex flex-col"
          >
            <DrawerBody closeRef={closeRef} onClose={() => setOpen(false)} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function DrawerBody({ closeRef, onClose }: { closeRef: React.RefObject<HTMLButtonElement | null>; onClose: () => void }) {
  const lines = useCart((s) => s.lines);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);
  const savings = useCart(selectSavings);
  const { setQuantity, remove, add } = useCart.getState();
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_DELIVERY_THRESHOLD);

  return (
    <>
      <div className="flex items-center justify-between px-6 h-18 border-b border-line">
        <p className="display text-3xl">
          Your bag <span className="text-muted text-xl tabular-nums">({count})</span>
        </p>
        <button ref={closeRef} className="icon-btn -mr-2" onClick={onClose} aria-label="Close bag">
          <X className="size-5" />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex-1 grid place-items-center px-8 text-center">
          <div>
            <div className="mx-auto size-20 rounded-full bg-surface grid place-items-center">
              <ShoppingBag className="size-8 text-muted" />
            </div>
            <p className="display text-4xl mt-6">Nothing here yet.</p>
            <p className="text-muted text-sm mt-2">Your bag is waiting for its first good idea.</p>
            <Link href="/shop" className="btn btn-primary mt-8" onClick={onClose}>
              Start shopping <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="px-6 py-4 border-b border-line">
            <p className="text-sm">
              {remaining > 0 ? (
                <>
                  You&apos;re <strong className="font-medium tabular-nums">{formatPrice(remaining)}</strong> away from free
                  delivery.
                </>
              ) : (
                <>
                  <strong className="font-medium text-success">Free delivery unlocked.</strong> Nice.
                </>
              )}
            </p>
            <div className="mt-3 h-1 rounded-full bg-surface overflow-hidden">
              <motion.div
                className="h-full bg-accent origin-left"
                initial={false}
                animate={{ scaleX: progress }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              />
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto px-6 divide-y divide-line">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.li
                  key={line.product.id}
                  layout
                  exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                  className="py-5 flex gap-4"
                >
                  <Link
                    href={`/product/${line.product.id}`}
                    onClick={onClose}
                    className="relative size-24 shrink-0 rounded-2xl overflow-hidden"
                    style={{ background: categoryTile(line.product.category) }}
                  >
                    <Image src={line.product.image} alt="" fill sizes="96px" className="object-contain p-2" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <Link
                        href={`/product/${line.product.id}`}
                        onClick={onClose}
                        className="text-sm font-medium leading-snug line-clamp-2 hover:underline underline-offset-2"
                      >
                        {line.product.title}
                      </Link>
                      <Price price={line.product.price * line.quantity} size="sm" />
                    </div>
                    {line.product.brand && <p className="text-xs text-muted mt-0.5">{line.product.brand}</p>}
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <QuantityStepper
                        size="sm"
                        value={line.quantity}
                        max={line.product.stock}
                        onChange={(q) => setQuantity(line.product.id, q)}
                      />
                      <button
                        className="text-xs text-muted hover:text-fg underline underline-offset-2"
                        onClick={() => {
                          remove(line.product.id);
                          toast(`Removed ${line.product.title}`, {
                            action: { label: "Undo", onClick: () => add(line.product, line.quantity) },
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="border-t border-line px-6 pt-5 pb-6 space-y-4 bg-raised">
            <div className="space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              {savings > 0 && <Row label="You save" value={`−${formatPrice(savings)}`} className="text-accent" />}
              <Row label="Delivery" value={remaining > 0 ? "Calculated at checkout" : "Free"} muted />
            </div>
            <Link href="/checkout" className="btn btn-accent w-full h-14 text-base" onClick={onClose}>
              Checkout · {formatPrice(subtotal)}
            </Link>
            <Link href="/cart" className="block text-center text-sm text-muted hover:text-fg" onClick={onClose}>
              View full bag
            </Link>
          </div>
        </>
      )}
    </>
  );
}

function Row({ label, value, muted, className = "" }: { label: string; value: string; muted?: boolean; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span className={muted ? "text-muted" : undefined}>{label}</span>
      <span className={`tabular-nums ${muted ? "text-muted" : ""}`}>{value}</span>
    </div>
  );
}
