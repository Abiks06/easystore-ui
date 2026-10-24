"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Command } from "cmdk";
import { ArrowUpRight, CornerDownLeft, Moon, Search, ShoppingBag, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useUI } from "@/store/ui";
import { CATEGORY_META, categoryLabel, categoryTile } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";
import { toggleTheme } from "./theme";

let cache: ProductSummary[] | null = null;

export default function CommandMenu() {
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const router = useRouter();
  const [products, setProducts] = useState<ProductSummary[]>(cache ?? []);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open || cache) return;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: ProductSummary[]) => {
        cache = data;
        setProducts(data);
      })
      .catch(() => {});
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-70 flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="relative w-full max-w-2xl"
          >
            <Command
              label="Search the store"
              loop
              className="rounded-3xl bg-raised border border-line shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 border-b border-line">
                <Search className="size-5 text-muted shrink-0" />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search products, brands, collections…"
                  className="flex-1 h-16 bg-transparent outline-none text-lg placeholder:text-muted"
                />
                <kbd className="font-mono text-[10px] px-1.5 py-1 rounded-md bg-surface text-muted">ESC</kbd>
              </div>

              <Command.List className="max-h-[min(60vh,520px)] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="py-14 text-center">
                  <p className="display text-3xl">No luck with “{query}”.</p>
                  <p className="text-sm text-muted mt-2">Try a brand, or something like “watch” or “lipstick”.</p>
                </Command.Empty>

                {products.length > 0 && (
                  <Command.Group heading="Products">
                    {products.map((p) => (
                      <Command.Item
                        key={p.id}
                        value={`${p.title} ${p.id}`}
                        keywords={[p.brand ?? "", categoryLabel(p.category), p.category]}
                        onSelect={() => go(`/product/${p.id}`)}
                        className="group flex items-center gap-4 px-3 py-2.5 rounded-2xl cursor-pointer data-[selected=true]:bg-fg/8"
                      >
                        <span
                          className="relative size-12 shrink-0 rounded-xl overflow-hidden"
                          style={{ background: categoryTile(p.category) }}
                        >
                          <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium truncate">{p.title}</span>
                          <span className="block text-xs text-muted truncate">
                            {[p.brand, categoryLabel(p.category)].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                        <span className="text-sm tabular-nums">{formatPrice(p.price)}</span>
                        <CornerDownLeft className="size-4 text-muted opacity-0 group-data-[selected=true]:opacity-100" />
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                <Command.Group heading="Collections">
                  {Object.entries(CATEGORY_META).map(([slug, meta]) => (
                    <Command.Item
                      key={slug}
                      value={`collection ${meta.label}`}
                      onSelect={() => go(`/collections/${slug}`)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer data-[selected=true]:bg-fg/8"
                    >
                      <span className="size-8 rounded-full grid place-items-center" style={{ background: meta.tile }}>
                        <Tag className="size-3.5 text-black/70" />
                      </span>
                      <span className="text-sm flex-1">{meta.label}</span>
                      <ArrowUpRight className="size-4 text-muted" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions">
                  <Command.Item
                    value="open bag cart"
                    onSelect={() => {
                      setOpen(false);
                      setCartOpen(true);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer data-[selected=true]:bg-fg/8"
                  >
                    <ShoppingBag className="size-4" /> <span className="text-sm">Open bag</span>
                  </Command.Item>
                  <Command.Item
                    value="toggle theme dark light mode"
                    onSelect={() => {
                      toggleTheme();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer data-[selected=true]:bg-fg/8"
                  >
                    <Moon className="size-4" /> <span className="text-sm">Toggle dark mode</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="hidden sm:flex items-center gap-4 px-5 h-11 border-t border-line text-xs text-muted">
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> open
                </span>
                <span className="ml-auto">
                  Press <kbd className="font-mono">/</kbd> anywhere to search
                </span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
