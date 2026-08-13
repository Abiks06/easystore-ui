"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white/50 mb-8 text-sm font-medium text-zinc-600"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Summer Collection Available</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6"
        >
          Everything You Need,{" "}
          <span className="brand-shimmer">Elevated</span>{" "}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Discover our curated collection of premium electronics, beauty essentials, lifestyle goods, and more. Quality without compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/shop" className="flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-semibold shadow-lg hover:bg-zinc-800 transition-all duration-300 no-underline">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/collections" className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-semibold shadow-sm border border-zinc-200 hover:border-zinc-300 transition-all duration-300 no-underline">
            View Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
