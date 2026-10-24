import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories, getProducts, getTrending } from "@/lib/catalog";
import { categoryTile } from "@/lib/categories";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Why EasyStore keeps its shelves small, and what we promise every customer.",
};

const PRINCIPLES = [
  ["Fewer, better", "We'd rather stock one great kettle than nine forgettable ones. Every collection is capped on purpose."],
  ["Honest prices", "Sales are real markdowns on the price we actually sell at, never inflated to look like a deal."],
  ["Local by default", "Same-day delivery in Accra, Mobile Money at checkout, and a counter in Osu if you'd rather collect."],
  ["Easy to undo", "Thirty days to change your mind. No forms, no awkward phone calls, no restocking fee."],
];

export default function AboutPage() {
  const products = getProducts();
  const categories = getCategories();
  const picks = getTrending(6);
  const avg = products.reduce((n, p) => n + p.rating, 0) / products.length;

  return (
    <div className="container-x pt-12 md:pt-16">
      <p className="eyebrow mb-6">About EasyStore</p>
      <h1 className="display text-6xl md:text-[9rem] max-w-6xl">
        A shop that does the <em className="text-accent">choosing</em> for you.
      </h1>

      <div className="mt-16 grid md:grid-cols-2 gap-10 md:gap-20">
        <p className="text-2xl leading-snug">
          Most online stores show you everything. We started EasyStore because we were tired of scrolling past forty versions of the
          same thing to find the one that was any good.
        </p>
        <p className="text-muted leading-relaxed">
          So we keep the shelves small. Each of our {categories.length} collections is a short list of things we&apos;d happily buy again,
          from lash mascara to laptops. When something better comes along, it replaces what was there. The result is a store you can
          actually browse, with prices in cedis, delivery that turns up, and people on the other end of the line.
        </p>
      </div>

      <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 border-y border-line divide-x divide-line">
        {[
          [products.length, "Products, total"],
          [categories.length, "Collections"],
          [avg.toFixed(1), "Average rating"],
          ["30", "Day returns"],
        ].map(([value, label]) => (
          <div key={label} className="py-8 px-4 md:px-8 [&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-l">
            <dd className="display text-6xl md:text-7xl tabular-nums">{value}</dd>
            <dt className="eyebrow mt-2">{label}</dt>
          </div>
        ))}
      </dl>

      <section className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-3 gap-3">
          {picks.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link href={`/product/${p.id}`} className="block relative aspect-square rounded-2xl overflow-hidden" style={{ background: categoryTile(p.category) }}>
                <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-contain p-3 hover:scale-110 transition-transform duration-500" />
              </Link>
            </Reveal>
          ))}
        </div>
        <div>
          <h2 className="display text-5xl md:text-6xl">What we promise</h2>
          <ol className="mt-8 space-y-6">
            {PRINCIPLES.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[3rem_1fr] gap-2">
                <span className="font-mono text-xs text-muted pt-1.5">0{i + 1}</span>
                <div>
                  <p className="font-medium text-lg">{title}</p>
                  <p className="text-muted mt-1 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/shop" className="btn btn-primary h-14 px-8 mt-10">
            See what made the cut <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
