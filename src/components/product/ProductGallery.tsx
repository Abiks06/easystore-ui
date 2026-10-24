"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function ProductGallery({ images, title, tile }: { images: string[]; title: string; tile: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const strip = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square rounded-2xl overflow-hidden transition-[outline-color,opacity] outline-2 outline-offset-2 ${
                i === active ? "outline-fg" : "outline-transparent opacity-60 hover:opacity-100"
              }`}
              style={{ background: tile }}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}

      {/* Desktop: single stage with cursor-follow zoom */}
      <div
        className="hidden md:block relative flex-1 aspect-square rounded-[2rem] overflow-hidden grain cursor-zoom-in"
        style={{ background: tile }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onPointerLeave={() => setZoom(null)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={images[active]}
              alt={title}
              fill
              preload={active === 0}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-contain p-[10%] transition-transform duration-300 ease-out"
              style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: swipeable strip */}
      <div className="md:hidden -mx-4">
        <div
          ref={strip}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={(e) => {
            const el = e.currentTarget;
            setActive(Math.round(el.scrollLeft / el.clientWidth));
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="snap-center shrink-0 w-full px-4">
              <div className="relative aspect-square rounded-[1.75rem] overflow-hidden grain" style={{ background: tile }}>
                <Image src={src} alt={i === 0 ? title : ""} fill preload={i === 0} sizes="92vw" className="object-contain p-[10%]" />
              </div>
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => strip.current?.scrollTo({ left: i * strip.current.clientWidth, behavior: "smooth" })}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-fg" : "w-1.5 bg-line"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
