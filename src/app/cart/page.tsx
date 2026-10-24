"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Lock } from "lucide-react";
import { toast } from "sonner";
import { selectCount, selectSavings, selectSubtotal, useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { categoryTile } from "@/lib/categories";
import { deliveryFee, FREE_DELIVERY_THRESHOLD, formatPrice, pluralize } from "@/lib/format";
import { Price, QuantityStepper } from "@/components/product/bits";
import ProductCard from "@/components/product/ProductCard";

export default function CartPage() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);
  const savings = useCart(selectSavings);
  const { setQuantity, remove, add } = useCart.getState();
  const saved = useWishlist((s) => s.items);
  const toggleSaved = useWishlist((s) => s.toggle);
  const delivery = deliveryFee(subtotal);

  if (!hydrated) return <div className="container-x min-h-[70vh]" />;

  return (
    <div className="container-x pt-12 md:pt-16">
      <h1 className="display text-7xl md:text-9xl">
        Your <em>bag</em>
      </h1>
      <p className="mt-3 text-muted">{lines.length ? pluralize(count, "item") : "Empty, for now."}</p>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-[2rem] bg-surface p-10 md:p-16 text-center">
          <p className="display text-5xl">Nothing in here yet.</p>
          <p className="text-muted mt-3">The good stuff is a click away.</p>
          <Link href="/shop" className="btn btn-primary mt-8 h-14 px-8">
            Browse the shop <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
          <ul className="border-t border-line">
            <AnimatePresence initial={false}>
              {lines.map(({ product, quantity }) => (
                <motion.li
                  key={product.id}
                  layout
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
                  className="border-b border-line overflow-hidden"
                >
                  <div className="py-6 flex gap-5">
                    <Link
                      href={`/product/${product.id}`}
                      className="relative size-28 md:size-36 shrink-0 rounded-[1.25rem] overflow-hidden"
                      style={{ background: categoryTile(product.category) }}
                    >
                      <Image src={product.image} alt="" fill sizes="144px" className="object-contain p-3" />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-6">
                        <div className="min-w-0">
                          <p className="eyebrow">{product.brand ?? "EasyStore"}</p>
                          <Link href={`/product/${product.id}`} className="block mt-1 text-lg font-medium leading-snug hover:underline underline-offset-4">
                            {product.title}
                          </Link>
                          <p className="text-sm text-muted mt-1">{formatPrice(product.price)} each</p>
                        </div>
                        <Price price={product.price * quantity} compareAt={product.compareAt ? product.compareAt * quantity : null} />
                      </div>
                      <div className="mt-auto pt-4 flex flex-wrap items-center gap-4">
                        <QuantityStepper value={quantity} max={product.stock} onChange={(q) => setQuantity(product.id, q)} size="sm" />
                        <button
                          className="text-sm text-muted hover:text-fg inline-flex items-center gap-1.5"
                          onClick={() => {
                            if (!saved.some((p) => p.id === product.id)) toggleSaved(product);
                            remove(product.id);
                            toast("Moved to saved", { description: product.title });
                          }}
                        >
                          <Heart className="size-3.5" /> Save for later
                        </button>
                        <button
                          className="text-sm text-muted hover:text-fg underline underline-offset-4"
                          onClick={() => {
                            remove(product.id);
                            toast(`Removed ${product.title}`, { action: { label: "Undo", onClick: () => add(product, quantity) } });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <aside className="lg:sticky lg:top-24 rounded-[1.75rem] bg-raised border border-line p-6 md:p-8">
            <h2 className="display text-4xl">Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-accent">
                  <dt>Savings</dt>
                  <dd className="tabular-nums">−{formatPrice(savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Delivery (Accra)</dt>
                <dd className="tabular-nums">{delivery ? formatPrice(delivery) : "Free"}</dd>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-muted">
                  Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery.
                </p>
              )}
              <div className="flex justify-between pt-4 mt-4 border-t border-line text-lg font-medium">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(subtotal + delivery)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="btn btn-accent w-full h-14 mt-6 text-base">
              Checkout <ArrowRight className="size-4" />
            </Link>
            <p className="mt-4 text-xs text-muted flex items-center justify-center gap-1.5">
              <Lock className="size-3" /> MoMo, card on delivery or cash
            </p>
          </aside>
        </div>
      )}

      {saved.length > 0 && (
        <section className="mt-24">
          <h2 className="display text-5xl mb-8">
            Saved <em>for later</em>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {saved.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
