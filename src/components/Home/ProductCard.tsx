"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full relative"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-slate-50/50 p-6 flex items-center justify-center overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-linear-to-tr from-violet-200/40 to-fuchsia-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <Image
          src={product.imageUrl}
          alt={product.productName}
          width={250}
          height={250}
          className="object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500 z-10"
        />
        
        {!product.inStock && (
          <div className="absolute top-4 right-4 z-20 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
            Sold Out
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviewCount})</span>
        </div>

        <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 leading-tight">
          {product.productName}
        </h3>
        
        <p className="text-sm text-slate-500 mb-6 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-violet-700">
            ${product.price.toFixed(2)}
          </span>
          <button
            disabled={!product.inStock}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300
              ${
                product.inStock
                  ? "bg-slate-900 text-white hover:bg-violet-600 hover:scale-110 hover:shadow-violet-200/50"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
