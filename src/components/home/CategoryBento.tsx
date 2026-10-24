import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

// The first tiles get the big spots; the rest settle into the grid.
const SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "",
  "",
  "",
  "md:col-span-2",
  "md:col-span-4",
];

const WIDE = new Set(SPANS.flatMap((s, i) => (i > 0 && s.includes("col-span-") ? [i] : [])));

export default function CategoryBento({ categories }: { categories: Category[] }) {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow mb-3">Collections</p>
          <h2 className="display text-5xl md:text-7xl max-w-2xl">
            Eleven aisles, <em>no clutter.</em>
          </h2>
        </div>
        <p className="text-muted max-w-sm md:text-right">
          Every collection is small on purpose. If it&apos;s here, someone on the team would buy it again.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3 md:gap-4">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 4) * 0.06} className={`${SPANS[i] ?? ""} ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <Link
              href={`/collections/${c.slug}`}
              className="group relative block h-full rounded-[1.5rem] overflow-hidden grain"
              style={{ background: c.tile }}
            >
              <span
                className={`absolute ${
                  WIDE.has(i) ? "inset-0 md:inset-y-3 md:left-auto md:right-14 md:w-1/2 md:pb-6" : "inset-0"
                } p-6 pb-16 transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:-rotate-3`}
              >
                <span className="relative block size-full">
                  <Image
                    src={c.cover}
                    alt=""
                    fill
                    sizes={i === 0 || WIDE.has(i) ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-contain"
                  />
                </span>
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between text-black">
                <div>
                  <p className={`display leading-none ${i === 0 ? "text-5xl md:text-6xl" : "text-3xl"}`}>{c.label}</p>
                  <p className="text-xs mt-1.5 text-black/60">
                    {c.count} items{i === 0 && <span className="hidden md:inline"> · {c.blurb}</span>}
                  </p>
                </div>
                <span className="size-10 shrink-0 rounded-full bg-black text-white grid place-items-center transition-transform duration-500 ease-out-expo group-hover:rotate-45 group-hover:scale-110">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
