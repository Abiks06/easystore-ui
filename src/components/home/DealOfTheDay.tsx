"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { categoryTile } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/lib/use-hydrated";
import type { ProductSummary } from "@/lib/types";
import { Price, Rating } from "@/components/product/bits";
import { useAddToBag } from "@/components/product/use-add-to-bag";

function untilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const s = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export default function DealOfTheDay({ product, description }: { product: ProductSummary; description: string }) {
  const hydrated = useHydrated();
  const [time, setTime] = useState(untilMidnight);
  const addToBag = useAddToBag();
  // A stable, plausible "claimed" figure derived from the product rather than random noise.
  const claimed = 40 + ((product.id * 37) % 45);

  useEffect(() => {
    const id = setInterval(() => setTime(untilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="deal" className="container-x py-16 md:py-24 scroll-mt-24">
      <div className="relative rounded-[2rem] bg-fg text-bg overflow-hidden grid lg:grid-cols-2">
        <div className="relative aspect-square lg:aspect-auto lg:min-h-[560px] grain" style={{ background: categoryTile(product.category) }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0.9, rotate: -4, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={product.image} alt={product.title} fill sizes="(min-width: 1024px) 44vw, 92vw" className="object-contain p-[12%]" />
          </motion.div>
          <div className="absolute top-6 left-6 size-24 md:size-28 rounded-full bg-accent text-accent-fg grid place-items-center text-center rotate-[-12deg] shadow-xl">
            <span className="display leading-none">
              <span className="block text-4xl md:text-5xl">−{product.discount}%</span>
              <span className="block font-sans text-[10px] uppercase tracking-widest mt-1">today</span>
            </span>
          </div>
        </div>

        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <p className="eyebrow text-bg/60!">Deal of the day</p>
          <h2 className="display text-5xl md:text-6xl mt-4">{product.title}</h2>
          <div className="mt-4">
            <Rating value={product.rating} count={product.reviewCount} inverse />
          </div>
          <p className="mt-6 text-bg/70 leading-relaxed max-w-md line-clamp-3">{description}</p>

          <div className="mt-8 [&_s]:text-bg/50">
            <Price price={product.price} compareAt={product.compareAt} size="lg" />
          </div>

          <div className="mt-8">
            <p className="eyebrow text-bg/60! mb-3">Ends in</p>
            <div className="flex gap-2" aria-live="off">
              {(hydrated ? time : [null, null, null]).map((v, i) => (
                <div key={i} className="w-20 h-20 rounded-2xl bg-bg/10 grid place-items-center">
                  <span className="display text-4xl tabular-nums">{v === null ? "––" : String(v).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 max-w-sm">
            <div className="flex justify-between text-xs text-bg/60 mb-2">
              <span>{claimed}% claimed</span>
              <span>Save {formatPrice((product.compareAt ?? product.price) - product.price)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-bg/15 overflow-hidden">
              <motion.div
                className="h-full bg-accent origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: claimed / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => addToBag(product)} className="btn btn-accent h-14 px-8 text-base">
              <ShoppingBag className="size-4" /> Add to bag
            </button>
            <Link href={`/product/${product.id}`} className="btn h-14 px-8 text-base border border-bg/25 hover:border-bg">
              Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
