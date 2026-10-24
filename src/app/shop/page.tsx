import type { Metadata } from "next";
import { Suspense } from "react";
import ShopExplorer from "@/components/shop/ShopExplorer";
import { getSummaries } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop everything",
  description: "Browse the full EasyStore catalogue. Filter by category, brand, price and rating.",
};

export default function ShopPage() {
  const products = getSummaries();

  return (
    <>
      <header className="container-x pt-12 pb-10 md:pt-16 md:pb-14">
        <p className="eyebrow mb-4">The whole shop · {products.length} products</p>
        <h1 className="display text-7xl md:text-9xl">
          Everything, <em>all at once.</em>
        </h1>
      </header>
      <Suspense fallback={<div className="container-x h-[60vh]" />}>
        <ShopExplorer products={products} />
      </Suspense>
    </>
  );
}
