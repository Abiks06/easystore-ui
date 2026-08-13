"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/components/Home/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function ProductActions({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleAddToCart = () => {
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
    <button 
      onClick={handleAddToCart}
      disabled={!product.inStock}
      className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg transition-all duration-300 shadow-xl
        ${product.inStock 
          ? "bg-slate-900 text-white hover:bg-violet-600 hover:shadow-violet-200 hover:-translate-y-1" 
          : "bg-slate-200 text-slate-400 cursor-not-allowed"}
      `}
    >
      <ShoppingCart className="w-5 h-5" />
      {product.inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
