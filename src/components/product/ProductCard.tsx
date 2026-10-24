"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { categoryTile } from "@/lib/categories";
import type { ProductSummary } from "@/lib/types";
import { Price, Rating } from "./bits";
import { useAddToBag } from "./use-add-to-bag";
import WishlistButton from "./WishlistButton";

export default function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw",
}: {
  product: ProductSummary;
  priority?: boolean;
  sizes?: string;
}) {
  const addToBag = useAddToBag();
  const lowStock = product.stock < 10;

  return (
    <article className="group relative flex flex-col">
      <div
        className="relative aspect-4/5 rounded-[1.25rem] overflow-hidden isolate"
        style={{ background: categoryTile(product.category) }}
      >
        <Link href={`/product/${product.id}`} className="absolute inset-0" aria-label={product.title}>
          <Image
            src={product.image}
            alt=""
            fill
            sizes={sizes}
            preload={priority}
            className={`object-contain p-[12%] transition-[opacity,transform] duration-700 ease-out-expo group-hover:scale-[1.06] ${
              product.hoverImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              sizes={sizes}
              className="object-contain p-[12%] opacity-0 scale-95 transition-[opacity,transform] duration-700 ease-out-expo group-hover:opacity-100 group-hover:scale-100"
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 pointer-events-none">
          {product.discount > 0 && (
            <span className="px-2 py-1 rounded-full bg-accent text-accent-fg text-[11px] font-semibold tabular-nums">
              −{product.discount}%
            </span>
          )}
          {lowStock && (
            <span className="px-2 py-1 rounded-full bg-black/80 text-white text-[11px] font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>

        <WishlistButton product={product} className="absolute top-2 right-2" />

        <button
          onClick={() => addToBag(product)}
          className="absolute bottom-3 right-3 h-10 w-10 justify-center sm:w-auto sm:pl-3 sm:pr-4 rounded-full bg-black text-white text-sm font-medium flex items-center gap-1.5 shadow-lg
            transition-[opacity,transform,background-color] duration-300 ease-out-expo hover:bg-accent
            md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:focus-visible:opacity-100 md:focus-visible:translate-y-0"
          aria-label={`Add ${product.title} to bag`}
        >
          <Plus className="size-4" /> <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      <div className="pt-3.5 px-0.5 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow truncate">{product.brand ?? "EasyStore"}</p>
          <Rating value={product.rating} />
        </div>
        <h3 className="text-[0.9375rem] leading-snug font-medium line-clamp-1">
          <Link href={`/product/${product.id}`} className="hover:underline underline-offset-4 decoration-1">
            {product.title}
          </Link>
        </h3>
        <Price price={product.price} compareAt={product.compareAt} />
      </div>
    </article>
  );
}
