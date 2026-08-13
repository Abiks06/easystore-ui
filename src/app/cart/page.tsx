"use client";

import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Simulate checkout process
    toast.success("Order placed successfully!", {
      icon: '🎉',
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });
    
    clearCart();
  };

  if (!mounted) {
    return <main className="py-20 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto min-h-[70vh]"></main>;
  }

  return (
    <main className="py-20 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto min-h-[70vh]">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 anim-fade-up">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white shadow-sm">
          <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
          <Link href="/" className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-200 hover:scale-105 transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 space-y-6 anim-slide-up">
            {cartItems.map((item) => (
              <div key={item.productId} className="glass-card rounded-3xl p-6 flex items-center gap-6 relative">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center p-2">
                  <Image src={item.imageUrl} alt={item.productName} width={80} height={80} className="object-contain drop-shadow-md" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{item.productName}</h3>
                  <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                  <p className="font-bold text-violet-700">GH₵{item.price.toFixed(2)}</p>
                </div>
                <div className="absolute top-6 right-6">
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-slate-100 rounded-lg px-2 py-1">
                  <button 
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded-md transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded-md transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 anim-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="glass-card rounded-3xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm text-slate-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">GH₵{getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">Free</span>
                </div>
                <div className="h-px w-full bg-slate-200 my-4" />
                <div className="flex justify-between text-base">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-violet-700">GH₵{getSubtotal().toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-xl font-semibold shadow-lg hover:bg-violet-600 hover:shadow-violet-200 transition-all duration-300"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
