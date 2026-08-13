"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";
import Link from "next/link";

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

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please log in to add to cart");
      router.push("/login");
      return;
    }

    addToCart(product);
    toast.success(`${product.productName} added to cart!`, {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <Link href={`/product/${product.productId}`} className="block h-full group no-underline">
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl hover:border-zinc-200 transition-all duration-500 group flex flex-col h-full relative"
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full bg-zinc-50/50 p-6 flex items-center justify-center overflow-hidden">
        
        <Image
          src={product.imageUrl}
          alt={product.productName}
          width={250}
          height={250}
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out z-10"
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
          <Star className="w-4 h-4 fill-zinc-900 text-zinc-900" />
          <span className="text-sm font-semibold text-zinc-800">{product.rating}</span>
          <span className="text-xs text-zinc-400">({product.reviewCount})</span>
        </div>

        <h3 className="font-heading text-lg font-bold text-zinc-900 mb-2 leading-tight">
          {product.productName}
        </h3>
        
        <p className="text-sm text-slate-500 mb-6 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-zinc-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300
              ${
                product.inStock
                  ? "bg-zinc-900 text-white hover:bg-zinc-800 hover:scale-105 hover:shadow-md"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }
            `}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}
