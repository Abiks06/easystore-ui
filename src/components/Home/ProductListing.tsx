"use client";

import { motion, Variants } from "framer-motion";
import ProductCard, { Product } from "./ProductCard";
import { PackageOpen } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ProductListing({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageOpen className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-lg font-semibold text-slate-500">No products found</p>
        <p className="text-sm text-slate-400 mt-1">Check back soon for new arrivals!</p>
      </div>
    );
  }

  return (
    <section id="products" className="px-6 py-12 pb-24 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-heading text-3xl font-bold text-slate-900">Trending Now</h2>
            <p className="text-slate-500 mt-2">Discover our most popular sticker designs.</p>
          </div>
          <span className="text-sm font-medium text-slate-400 bg-white/50 px-3 py-1 rounded-full border border-slate-200">
            {products.length} items
          </span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.productId} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
