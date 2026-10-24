import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

/** A magazine-style spread that sells one collection with a point of view. */
export default function Editorial({
  eyebrow,
  title,
  body,
  href,
  tile,
  products,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  href: string;
  tile: string;
  products: ProductSummary[];
}) {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="display text-6xl md:text-8xl">{title}</h2>
          <p className="mt-8 text-lg text-muted leading-relaxed max-w-md">{body}</p>
          <Link href={href} className="btn btn-primary h-14 px-7 mt-10 group">
            Explore the edit <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {products.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className={i % 2 === 1 ? "translate-y-10" : ""}>
              <Link
                href={`/product/${p.id}`}
                className="group block relative aspect-[4/5] rounded-[1.5rem] overflow-hidden grain"
                style={{ background: tile }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 26vw, 46vw"
                  className="object-contain p-[14%] transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
                <span className="absolute left-4 right-4 bottom-4 text-black">
                  <span className="block text-sm font-medium truncate">{p.title}</span>
                  <span className="block text-xs text-black/60 tabular-nums">{formatPrice(p.price)}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
