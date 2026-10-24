"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categoryTile } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";

const EASE = [0.16, 1, 0.3, 1] as const;

// Where each floating tile sits in the collage, and how strongly it follows the cursor.
const SLOTS = [
  { className: "left-[4%] top-[6%] w-[46%] rotate-[-6deg]", depth: 30 },
  { className: "right-[2%] top-[0%] w-[40%] rotate-[5deg]", depth: 18 },
  { className: "left-[20%] bottom-[2%] w-[38%] rotate-[3deg]", depth: 42 },
  { className: "right-[6%] bottom-[10%] w-[30%] rotate-[-4deg]", depth: 24 },
];

export default function Hero({ products, stats }: { products: ProductSummary[]; stats: { products: number; categories: number; brands: number } }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 80, damping: 20 });
  const y = useSpring(my, { stiffness: 80, damping: 20 });

  const words = ["Everyday", "things,", "properly", "chosen."];

  return (
    <section
      className="relative overflow-hidden"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center pt-10 pb-16 md:pt-16 md:pb-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow flex items-center gap-2"
          >
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Accra · New arrivals every week
          </motion.p>

          <h1 className="display text-[clamp(3.75rem,10vw,9.5rem)] mt-6">
            {words.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.2em] last:mr-0">
                <motion.span
                  className={`inline-block ${word === "properly" ? "italic text-accent" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-8 max-w-md text-lg text-muted leading-relaxed"
          >
            A small, well-edited store for beauty, kitchen, tech and home. Fewer things, better picked, delivered to your door.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="/shop" className="btn btn-primary h-14 px-7 text-base group">
              Shop everything
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#deal" className="btn btn-ghost h-14 px-7 text-base">
              Today&apos;s deal
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14 grid grid-cols-3 max-w-md border-t border-line pt-6"
          >
            {[
              [stats.products, "Products"],
              [stats.brands, "Brands"],
              [stats.categories, "Collections"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="eyebrow">{label}</dt>
                <dd className="display text-4xl mt-1 tabular-nums">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative aspect-square w-full max-w-xl mx-auto lg:max-w-none">
          {products.slice(0, 4).map((p, i) => (
            <FloatingTile key={p.id} product={p} index={i} x={x} y={y} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingTile({
  product,
  index,
  x,
  y,
}: {
  product: ProductSummary;
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const slot = SLOTS[index];
  const tx = useTransform(x, (v) => v * slot.depth);
  const ty = useTransform(y, (v) => v * slot.depth);

  return (
    <motion.div
      className={`absolute ${slot.className}`}
      style={{ x: tx, y: ty }}
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.3 + index * 0.12, ease: EASE }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group block relative aspect-square rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] grain"
        style={{ background: categoryTile(product.category) }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 22vw, 45vw"
          preload={index < 2}
          className="object-contain p-[14%] transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />
        <span className="absolute left-3 bottom-3 right-3 flex items-center justify-between gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1.5 text-[11px] text-black opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="truncate font-medium">{product.title}</span>
          <span className="tabular-nums shrink-0">{formatPrice(product.price)}</span>
        </span>
      </Link>
    </motion.div>
  );
}
