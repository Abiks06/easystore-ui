"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Grid2x2, Grid3x3, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { categoryLabel } from "@/lib/categories";
import { formatPrice, pluralize } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";

const SORTS = {
  featured: "Featured",
  popular: "Most popular",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
  discount: "Biggest discount",
} as const;
type Sort = keyof typeof SORTS;

const PRICE_BANDS = [
  { id: "u100", label: `Under ${formatPrice(100)}`, min: 0, max: 100 },
  { id: "100-500", label: `${formatPrice(100)} – ${formatPrice(500)}`, min: 100, max: 500 },
  { id: "500-2k", label: `${formatPrice(500)} – ${formatPrice(2000)}`, min: 500, max: 2000 },
  { id: "2k", label: `${formatPrice(2000)}+`, min: 2000, max: Infinity },
];

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export default function ShopExplorer({
  products,
  lockedCategory,
}: {
  products: ProductSummary[];
  lockedCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const q = params.get("q") ?? "";
  const cats = list(params.get("cat"));
  const brands = list(params.get("brand"));
  const bands = list(params.get("price"));
  const minRating = Number(params.get("rating") ?? 0);
  const saleOnly = params.get("sale") === "1";
  const sort = (params.get("sort") as Sort) in SORTS ? (params.get("sort") as Sort) : "featured";

  const [query, setQuery] = useState(q);
  const [dense, setDense] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [lastQ, setLastQ] = useState(q);
  if (q !== lastQ) {
    setLastQ(q);
    setQuery(q);
  }

  const update = (patch: Record<string, string | string[] | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(patch)) {
      const v = Array.isArray(value) ? value.join(",") : value;
      if (v) next.set(key, v);
      else next.delete(key);
    }
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };

  // Debounce typing into the URL so history isn't spammed per keystroke.
  useEffect(() => {
    if (query === q) return;
    const id = setTimeout(() => update({ q: query.trim() || null }), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const toggleIn = (key: string, current: string[], value: string) =>
    update({ [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] });

  // Facet counts come from the set before that facet is applied, so options never dead-end.
  const base = useMemo(() => {
    const needle = q.toLowerCase();
    return products.filter(
      (p) =>
        (!needle || `${p.title} ${p.brand ?? ""} ${categoryLabel(p.category)}`.toLowerCase().includes(needle)) &&
        (!saleOnly || p.discount > 0) &&
        p.rating >= minRating &&
        (bands.length === 0 || bands.some((id) => {
          const b = PRICE_BANDS.find((x) => x.id === id);
          return b && p.price >= b.min && p.price < b.max;
        })),
    );
  }, [products, q, saleOnly, minRating, bands]);

  const categoryCounts = useMemo(() => countBy(base.filter((p) => brands.length === 0 || brands.includes(p.brand ?? "")), (p) => p.category), [base, brands]);
  const brandCounts = useMemo(() => countBy(base.filter((p) => cats.length === 0 || cats.includes(p.category)), (p) => p.brand ?? ""), [base, cats]);

  const results = useMemo(() => {
    const filtered = base.filter(
      (p) => (cats.length === 0 || cats.includes(p.category)) && (brands.length === 0 || brands.includes(p.brand ?? "")),
    );
    const sorted = [...filtered];
    switch (sort) {
      case "popular":
        sorted.sort((a, b) => b.rating * Math.log2(b.reviewCount + 2) - a.rating * Math.log2(a.reviewCount + 2));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        sorted.sort((a, b) => b.discount - a.discount);
        break;
    }
    return sorted;
  }, [base, cats, brands, sort]);

  const active = [
    ...(q ? [{ label: `“${q}”`, clear: () => update({ q: null }) }] : []),
    ...cats.map((c) => ({ label: categoryLabel(c), clear: () => toggleIn("cat", cats, c) })),
    ...brands.map((b) => ({ label: b, clear: () => toggleIn("brand", brands, b) })),
    ...bands.map((id) => ({ label: PRICE_BANDS.find((b) => b.id === id)?.label ?? id, clear: () => toggleIn("price", bands, id) })),
    ...(minRating ? [{ label: `${minRating}★ & up`, clear: () => update({ rating: null }) }] : []),
    ...(saleOnly ? [{ label: "On sale", clear: () => update({ sale: null }) }] : []),
  ];
  const clearAll = () => update({ q: null, cat: null, brand: null, price: null, rating: null, sale: null });

  const filters = (
    <div className="space-y-8">
      {!lockedCategory && (
        <FilterGroup title="Category">
          {Object.entries(categoryCounts)
            .sort((a, b) => categoryLabel(a[0]).localeCompare(categoryLabel(b[0])))
            .map(([slug, count]) => (
              <CheckRow key={slug} checked={cats.includes(slug)} onChange={() => toggleIn("cat", cats, slug)} label={categoryLabel(slug)} count={count} />
            ))}
        </FilterGroup>
      )}

      <FilterGroup title="Price">
        <div className="flex flex-wrap gap-2">
          {PRICE_BANDS.map((b) => (
            <button key={b.id} className="chip" data-active={bands.includes(b.id)} onClick={() => toggleIn("price", bands, b.id)}>
              {b.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className="flex flex-wrap gap-2">
          {[4.5, 4, 3].map((r) => (
            <button key={r} className="chip" data-active={minRating === r} onClick={() => update({ rating: minRating === r ? null : String(r) })}>
              {r}★ & up
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Offers">
        <CheckRow checked={saleOnly} onChange={() => update({ sale: saleOnly ? null : "1" })} label="On sale" count={products.filter((p) => p.discount > 0).length} />
      </FilterGroup>

      {Object.keys(brandCounts).filter(Boolean).length > 1 && (
        <FilterGroup title="Brand">
          <div className="max-h-72 overflow-y-auto -mr-2 pr-2 space-y-0.5">
            {Object.entries(brandCounts)
              .filter(([b]) => b)
              .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
              .map(([brand, count]) => (
                <CheckRow key={brand} checked={brands.includes(brand)} onChange={() => toggleIn("brand", brands, brand)} label={brand} count={count} />
              ))}
          </div>
        </FilterGroup>
      )}
    </div>
  );

  return (
    <div className="container-x">
      {/* Toolbar */}
      <div className="sticky top-16 md:top-18 z-20 -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-bg/85 backdrop-blur-xl border-b border-line flex items-center gap-2 md:gap-3">
        <label className="relative flex-1 max-w-md">
          <span className="sr-only">Search products</span>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lockedCategory ? `Search ${categoryLabel(lockedCategory)}…` : "Search the shop…"}
            className="field h-11 pl-11 rounded-full"
            type="search"
          />
        </label>
        <button className="chip h-11 lg:hidden" onClick={() => setSheetOpen(true)}>
          <SlidersHorizontal className="size-4" /> Filters
          {active.length > 0 && <span className="size-5 rounded-full bg-accent text-accent-fg text-[10px] grid place-items-center">{active.length}</span>}
        </button>
        <div className="ml-auto flex items-center gap-2">
          <label className="relative hidden sm:block">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
              className="chip h-11 appearance-none pr-9 bg-transparent"
            >
              {Object.entries(SORTS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none" />
          </label>
          <div className="hidden md:flex rounded-full border border-line p-1">
            <button className={`size-9 grid place-items-center rounded-full ${!dense ? "bg-fg text-bg" : ""}`} onClick={() => setDense(false)} aria-label="Comfortable grid" aria-pressed={!dense}>
              <Grid2x2 className="size-4" />
            </button>
            <button className={`size-9 grid place-items-center rounded-full ${dense ? "bg-fg text-bg" : ""}`} onClick={() => setDense(true)} aria-label="Dense grid" aria-pressed={dense}>
              <Grid3x3 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10 pt-8">
        <aside className="hidden lg:block">
          <div className="sticky top-40">{filters}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-6 min-h-9">
            <p className="text-sm text-muted mr-2 tabular-nums" aria-live="polite">
              {pluralize(results.length, "product")}
            </p>
            <AnimatePresence initial={false}>
              {active.map((f) => (
                <motion.button
                  key={f.label}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={f.clear}
                  className="chip h-8 bg-surface border-transparent hover:border-fg"
                >
                  {f.label} <X className="size-3" />
                </motion.button>
              ))}
            </AnimatePresence>
            {active.length > 1 && (
              <button onClick={clearAll} className="text-sm underline underline-offset-4 ml-1 hover:text-accent">
                Clear all
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="py-24 text-center">
              <p className="display text-5xl">Nothing matches that.</p>
              <p className="text-muted mt-3">Try loosening a filter or two.</p>
              <button onClick={clearAll} className="btn btn-primary mt-8">
                Clear filters
              </button>
            </div>
          ) : (
            <motion.ul
              layout
              className={`grid gap-x-4 gap-y-10 md:gap-x-5 ${
                dense ? "grid-cols-2 md:grid-cols-4 xl:grid-cols-5" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard
                      product={p}
                      priority={i < 4}
                      sizes={dense ? "(min-width: 1280px) 16vw, (min-width: 768px) 22vw, 46vw" : undefined}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-60 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div className="absolute inset-0 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheetOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => info.offset.y > 120 && setSheetOpen(false)}
              className="absolute inset-x-0 bottom-0 max-h-[88dvh] bg-bg rounded-t-[1.75rem] flex flex-col"
            >
              <div className="pt-3 pb-2 grid place-items-center">
                <span className="w-10 h-1 rounded-full bg-line" />
              </div>
              <div className="px-5 pb-3 flex items-center justify-between">
                <p className="display text-3xl">Filters</p>
                <label className="relative">
                  <span className="sr-only">Sort by</span>
                  <select
                    value={sort}
                    onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
                    className="chip appearance-none pr-8 bg-transparent"
                  >
                    {Object.entries(SORTS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 pointer-events-none" />
                </label>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">{filters}</div>
              <div className="p-4 border-t border-line flex gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <button className="btn btn-ghost flex-1" onClick={clearAll}>
                  Clear
                </button>
                <button className="btn btn-primary flex-[2]" onClick={() => setSheetOpen(false)}>
                  Show {pluralize(results.length, "result")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function countBy<T>(items: T[], key: (item: T) => string) {
  const out: Record<string, number> = {};
  for (const item of items) out[key(item)] = (out[key(item)] ?? 0) + 1;
  return out;
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3">{title}</legend>
      {children}
    </fieldset>
  );
}

function CheckRow({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count: number }) {
  return (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer group text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <span className="size-5 rounded-md border border-line grid place-items-center transition-colors group-hover:border-fg peer-checked:bg-fg peer-checked:border-fg peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
        <Check className={`size-3.5 text-bg transition-transform ${checked ? "scale-100" : "scale-0"}`} strokeWidth={3} />
      </span>
      <span className="flex-1">{label}</span>
      <span className="text-muted tabular-nums text-xs">{count}</span>
    </label>
  );
}
