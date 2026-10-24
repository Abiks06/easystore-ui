"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useOrders } from "@/store/orders";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/lib/use-hydrated";
import { categoryTile } from "@/lib/categories";
import { formatPrice, pluralize } from "@/lib/format";
import ProductCard from "@/components/product/ProductCard";

export default function AccountPage() {
  const hydrated = useHydrated();
  const orders = useOrders((s) => s.orders);
  const profile = useOrders((s) => s.profile);
  const saved = useWishlist((s) => s.items);

  if (!hydrated) return <div className="container-x min-h-[70vh]" />;

  return (
    <div className="container-x pt-12 md:pt-16">
      <p className="eyebrow mb-4">Your account</p>
      <h1 className="display text-7xl md:text-9xl">
        {profile ? (
          <>
            Hello, <em>{profile.name.split(" ")[0]}.</em>
          </>
        ) : (
          <>
            Hello, <em>there.</em>
          </>
        )}
      </h1>
      <p className="mt-4 text-muted max-w-lg">
        No passwords to remember. Your orders and saved items live on this device, and your details are filled in for you next
        time you check out.
      </p>

      <section className="mt-16">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="display text-4xl">Orders</h2>
          <span className="text-sm text-muted">{pluralize(orders.length, "order")}</span>
        </div>
        {orders.length === 0 ? (
          <p className="py-10 text-muted">
            No orders yet.{" "}
            <Link href="/shop" className="text-fg underline underline-offset-4 hover:text-accent">
              Start with something small
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {orders.map((o) => (
              <li key={o.id}>
                <Link href={`/orders/${o.id}`} className="group py-5 grid grid-cols-[1fr_auto] md:grid-cols-[10rem_1fr_auto_auto] items-center gap-4 md:gap-8">
                  <span>
                    <span className="block font-mono text-sm">{o.id}</span>
                    <span className="block text-xs text-muted mt-0.5">
                      {new Date(o.placedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </span>
                  <span className="hidden md:flex -space-x-3">
                    {o.lines.slice(0, 5).map(({ product }) => (
                      <span
                        key={product.id}
                        className="relative size-12 rounded-full overflow-hidden ring-2 ring-bg"
                        style={{ background: categoryTile(product.category) }}
                      >
                        <Image src={product.image} alt="" fill sizes="48px" className="object-contain p-1" />
                      </span>
                    ))}
                  </span>
                  <span className="text-sm tabular-nums">{formatPrice(o.total)}</span>
                  <span className="hidden md:grid size-10 rounded-full border border-line place-items-center group-hover:bg-fg group-hover:text-bg transition-colors">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="saved" className="mt-16 scroll-mt-28">
        <div className="flex items-baseline justify-between border-b border-line pb-4 mb-8">
          <h2 className="display text-4xl">Saved</h2>
          <span className="text-sm text-muted">{pluralize(saved.length, "item")}</span>
        </div>
        {saved.length === 0 ? (
          <p className="text-muted">Tap the heart on anything you like and it&apos;ll wait for you here.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
