import { ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  return (
    <main className="py-20 px-6 max-w-6xl mx-auto min-h-[70vh]">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 anim-fade-up">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-6 anim-slide-up">
          <div className="glass-card rounded-3xl p-6 flex items-center gap-6 relative">
            <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center p-2">
              <Image src="/stickers/kawaii-cat.png" alt="Kawaii Cat" width={80} height={80} className="object-contain drop-shadow-md" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-lg">Kawaii Cat Sticker</h3>
              <p className="text-sm text-slate-500 mb-2">Cute & Kawaii</p>
              <p className="font-bold text-violet-700">$5.99</p>
            </div>
            <div className="absolute top-6 right-6">
              <button className="text-sm font-medium text-red-500 hover:text-red-700">Remove</button>
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-slate-100 rounded-lg px-2 py-1">
              <button className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded-md transition-colors">-</button>
              <span className="text-sm font-semibold">2</span>
              <button className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded-md transition-colors">+</button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 anim-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="glass-card rounded-3xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm text-slate-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">$11.98</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">$3.00</span>
              </div>
              <div className="h-px w-full bg-slate-200 my-4" />
              <div className="flex justify-between text-base">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-bold text-violet-700">$14.98</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-xl font-semibold shadow-lg hover:bg-violet-600 hover:shadow-violet-200 transition-all duration-300">
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
