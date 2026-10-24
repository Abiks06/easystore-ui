import Image from "next/image";
import Link from "next/link";
import { categoryTile } from "@/lib/categories";
import type { ProductSummary, Review } from "@/lib/types";
import { Rating } from "@/components/product/bits";
import Reveal from "@/components/ui/Reveal";

export default function Reviews({ reviews }: { reviews: (Review & { product: ProductSummary })[] }) {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-3">Word of mouth</p>
          <h2 className="display text-5xl md:text-7xl">
            Don&apos;t take <em>our</em> word for it.
          </h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08} className="break-inside-avoid">
              <figure className="rounded-[1.5rem] bg-raised p-6 md:p-8 border border-line">
                <Rating value={r.rating} />
                <blockquote className={`display mt-4 ${i % 3 === 0 ? "text-4xl" : "text-3xl"}`}>“{r.comment}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Link
                    href={`/product/${r.product.id}`}
                    className="relative size-11 rounded-xl overflow-hidden shrink-0"
                    style={{ background: categoryTile(r.product.category) }}
                  >
                    <Image src={r.product.image} alt="" fill sizes="44px" className="object-contain p-1" />
                  </Link>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{r.reviewerName}</span>
                    <span className="block text-xs text-muted truncate">on {r.product.title}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
