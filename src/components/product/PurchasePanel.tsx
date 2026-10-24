"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useRef, useState } from "react";
import { categoryTile } from "@/lib/categories";
import { FREE_DELIVERY_THRESHOLD, formatPrice } from "@/lib/format";
import { useHydrated } from "@/lib/use-hydrated";
import type { ProductSummary } from "@/lib/types";
import { Price, QuantityStepper, Rating } from "./bits";
import { useAddToBag } from "./use-add-to-bag";
import WishlistButton from "./WishlistButton";

interface Detail {
  title: string;
  rows: [string, string][];
}

export default function PurchasePanel({
  product,
  description,
  details,
}: {
  product: ProductSummary;
  description: string;
  details: Detail[];
}) {
  const [quantity, setQuantity] = useState(1);
  const addToBag = useAddToBag();
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonVisible = useInView(buttonRef, { initial: true });
  const hydrated = useHydrated();
  const stockPct = Math.min(1, product.stock / 100);

  return (
    <div>
      <p className="eyebrow">{product.brand ?? "EasyStore"}</p>
      <h1 className="display text-5xl md:text-6xl xl:text-7xl mt-3">{product.title}</h1>
      <a href="#reviews" className="inline-block mt-4 hover:opacity-70 transition-opacity">
        <Rating value={product.rating} count={product.reviewCount} size="md" />
      </a>

      <div className="mt-8 flex items-center gap-3">
        <Price price={product.price} compareAt={product.compareAt} size="lg" />
        {product.discount > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-accent text-accent-fg text-xs font-semibold">Save {product.discount}%</span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted">
        {product.price >= FREE_DELIVERY_THRESHOLD
          ? "Free delivery across Accra."
          : `Free delivery on orders over ${formatPrice(FREE_DELIVERY_THRESHOLD)}.`}
      </p>

      <p className="mt-8 text-[1.0625rem] leading-relaxed text-muted max-w-prose">{description}</p>

      <div className="mt-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${product.stock < 10 ? "bg-accent animate-pulse" : "bg-success"}`} />
            {product.stock < 10 ? `Only ${product.stock} left — order soon` : "In stock, ready to ship"}
          </span>
          <span className="text-muted tabular-nums">{product.stock} available</span>
        </div>
        <div className="h-1 rounded-full bg-surface overflow-hidden">
          <div className={`h-full ${product.stock < 10 ? "bg-accent" : "bg-fg"}`} style={{ width: `${Math.max(4, stockPct * 100)}%` }} />
        </div>
      </div>

      <div ref={buttonRef} className="mt-8 flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} max={product.stock} onChange={setQuantity} />
        <button onClick={() => addToBag(product, quantity)} className="btn btn-primary h-14 flex-1 min-w-48 text-base">
          <ShoppingBag className="size-4" />
          Add to bag · {formatPrice(product.price * quantity)}
        </button>
        <WishlistButton product={product} variant="outline" />
      </div>

      <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
        {[
          { icon: Truck, label: "Same-day in Accra", sub: "Order before 2pm" },
          { icon: RotateCcw, label: "30-day returns", sub: "Free and easy" },
          { icon: ShieldCheck, label: "Genuine product", sub: "Authorised seller" },
        ].map(({ icon: Icon, label, sub }) => (
          <li key={label} className="flex items-start gap-3 p-4 rounded-2xl bg-surface">
            <Icon className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
            <span>
              <span className="block font-medium">{label}</span>
              <span className="block text-muted text-xs mt-0.5">{sub}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-line">
        {details.map((d, i) => (
          <Accordion key={d.title} title={d.title} defaultOpen={i === 0}>
            <dl className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-x-6 gap-y-3 text-sm pb-6">
              {d.rows.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Accordion>
        ))}
      </div>

      {/* Mobile sticky buy bar once the main button scrolls away */}
      <AnimatePresence>
        {hydrated && !buttonVisible && (
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            exit={{ y: "120%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed z-30 inset-x-3 bottom-3 lg:hidden rounded-full bg-fg text-bg p-2 pl-2 flex items-center gap-3 shadow-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          >
            <span className="relative size-11 shrink-0 rounded-full overflow-hidden" style={{ background: categoryTile(product.category) }}>
              <Image src={product.image} alt="" fill sizes="44px" className="object-contain p-1" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-medium truncate">{product.title}</span>
              <span className="block text-xs text-bg/60 tabular-nums">{formatPrice(product.price)}</span>
            </span>
            <button onClick={() => addToBag(product, quantity)} className="btn btn-accent h-11 px-5 text-sm">
              Add to bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Accordion({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-line">
      <button className="w-full flex items-center justify-between py-5 text-left font-medium" onClick={() => setOpen(!open)} aria-expanded={open}>
        {title}
        <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
