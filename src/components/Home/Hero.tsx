"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium text-violet-700"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Summer Collection Available</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          Stick Your{" "}
          <span className="brand-shimmer">Personality</span>{" "}
          Anywhere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Curated, high-quality stickers to bring flair to your everyday items.
          Waterproof, vibrant, and incredibly durable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#products" className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/20 hover:scale-105 transition-all duration-300 no-underline">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#products" className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold shadow-lg shadow-slate-200/50 border border-slate-100 hover:scale-105 transition-all duration-300 no-underline">
            View Gallery
          </Link>
        </motion.div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 anim-blob" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 anim-blob" style={{ animationDelay: "2s" }} />
    </section>
  );
}
