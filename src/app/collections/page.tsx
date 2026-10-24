import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategories, getSummaries } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Collections",
  description: "Eleven small, carefully edited collections — from beauty to laptops.",
};

export default function CollectionsPage() {
  const categories = getCategories();
  const products = getSummaries();

  return (
    <div className="container-x pt-12 md:pt-16">
      <header className="mb-14 grid md:grid-cols-2 gap-6 items-end">
        <div>
          <p className="eyebrow mb-4">{categories.length} collections</p>
          <h1 className="display text-7xl md:text-9xl">
            Pick an <em>aisle.</em>
          </h1>
        </div>
        <p className="text-lg text-muted max-w-md md:justify-self-end">
          Each collection is deliberately small. Fewer choices, better ones, and no scrolling through forty versions of the same thing.
        </p>
      </header>

      <ul className="border-t border-line">
        {categories.map((c, i) => {
          const items = products.filter((p) => p.category === c.slug);
          const from = Math.min(...items.map((p) => p.price));
          return (
            <Reveal as="li" key={c.slug} delay={Math.min(i, 4) * 0.04}>
              <Link href={`/collections/${c.slug}`} className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[4rem_1fr_auto_auto] items-center gap-4 md:gap-8 py-6 border-b border-line">
                <span className="hidden md:block font-mono text-xs text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative size-16 md:hidden rounded-2xl overflow-hidden" style={{ background: c.tile }}>
                  <Image src={c.cover} alt="" fill sizes="64px" className="object-contain p-2" />
                </span>
                <span>
                  <span className="display text-4xl md:text-7xl block transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                    {c.label}
                  </span>
                  <span className="text-sm text-muted md:hidden">
                    {c.count} items · from {formatPrice(from)}
                  </span>
                </span>
                <span className="hidden md:flex items-center gap-3 -my-4">
                  {items.slice(0, 3).map((p, j) => (
                    <span
                      key={p.id}
                      className="relative size-20 rounded-2xl overflow-hidden opacity-0 translate-y-3 transition-all duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-y-0"
                      style={{ background: c.tile, transitionDelay: `${j * 50}ms` }}
                    >
                      <Image src={p.image} alt="" fill sizes="80px" className="object-contain p-2" />
                    </span>
                  ))}
                </span>
                <span className="flex items-center gap-4">
                  <span className="hidden md:block text-sm text-muted text-right">
                    {c.count} items
                    <br />
                    from {formatPrice(from)}
                  </span>
                  <span className="size-12 rounded-full border border-line grid place-items-center transition-colors group-hover:bg-accent group-hover:border-accent group-hover:text-accent-fg">
                    <ArrowUpRight className="size-5" />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
