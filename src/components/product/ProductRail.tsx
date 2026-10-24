"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProductSummary } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductRail({
  eyebrow,
  title,
  products,
  href,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  products: ProductSummary[];
  href?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container-x flex items-end justify-between gap-6 mb-8">
        <div>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 className="display text-5xl md:text-6xl">{title}</h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {href && (
            <Link href={href} className="hidden sm:inline-flex text-sm underline underline-offset-4 decoration-1 mr-3 hover:text-accent">
              View all
            </Link>
          )}
          <button className="icon-btn border border-line disabled:opacity-30" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Scroll left">
            <ArrowLeft className="size-4" />
          </button>
          <button className="icon-btn border border-line disabled:opacity-30" onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Scroll right">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="no-scrollbar flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory overscroll-x-contain scroll-px-4 md:scroll-px-8 px-4 md:px-8 max-w-352 mx-auto"
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-[68vw] sm:w-[40vw] md:w-[30vw] lg:w-[22vw] xl:w-[19rem]">
            <ProductCard product={p} sizes="(min-width: 1280px) 19rem, (min-width: 768px) 30vw, 68vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
