"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, User, Truck, Store, CreditCard } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Checkout State
  const [isCheckout, setIsCheckout] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [checkoutData, setCheckoutData] = useState({
    name: '', email: '', phone: '', address: '', city: '', cardNumber: '', expiry: '', cvv: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    if (!isCheckout) {
      setIsCheckout(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validate form if in checkout
    if (!checkoutData.name || !checkoutData.email || !checkoutData.phone || !checkoutData.cardNumber || !checkoutData.expiry || !checkoutData.cvv) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (deliveryMethod === 'delivery' && (!checkoutData.address || !checkoutData.city)) {
      toast.error("Please provide a delivery location.");
      return;
    }
    
    // Simulate checkout process
    toast.success("Order placed successfully!", {
      icon: '🎉',
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });
    
    setIsCheckout(false);
    clearCart();
    setCheckoutData({
      name: '', email: '', phone: '', address: '', city: '', cardNumber: '', expiry: '', cvv: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all";

  if (!mounted) {
    return <main className="py-20 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto min-h-[70vh]"></main>;
  }

  return (
    <main className="py-20 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto min-h-[70vh]">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 anim-fade-up">
        {isCheckout ? "Checkout" : "Your Cart"}
      </h1>
      
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
          {/* Main Content Area: Cart Items or Checkout Form */}
          <div className="flex-1 anim-slide-up">
            {!isCheckout ? (
              <div className="space-y-6">
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
            ) : (
              <div className="glass-card rounded-3xl p-6 md:p-8 space-y-8 bg-white/60">
                <div className="flex items-center gap-4 mb-2">
                  <button onClick={() => setIsCheckout(false)} className="p-2 bg-white rounded-full text-slate-600 hover:text-violet-700 hover:shadow-md transition-all">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-bold text-slate-800">Return to Cart</h2>
                </div>

                <div className="space-y-8">
                  {/* Customer Details */}
                  <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-violet-600" /> Customer Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" name="name" placeholder="Full Name *" value={checkoutData.name} onChange={handleInputChange} className={inputClasses} required />
                      <input type="email" name="email" placeholder="Email Address *" value={checkoutData.email} onChange={handleInputChange} className={inputClasses} required />
                      <input type="tel" name="phone" placeholder="Phone Number *" value={checkoutData.phone} onChange={handleInputChange} className={`md:col-span-2 ${inputClasses}`} required />
                    </div>
                  </section>

                  {/* Delivery Method */}
                  <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-violet-600" /> Delivery Method
                    </h3>
                    <div className="flex gap-4 mb-4">
                      <label className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${deliveryMethod === 'delivery' ? 'border-violet-600 bg-violet-50 text-violet-900 shadow-sm' : 'border-slate-200 hover:border-violet-200 text-slate-600'}`}>
                        <input type="radio" name="deliveryMethod" checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} className="hidden" />
                        <Truck className="w-5 h-5" /> <span className="font-semibold">Delivery</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${deliveryMethod === 'pickup' ? 'border-violet-600 bg-violet-50 text-violet-900 shadow-sm' : 'border-slate-200 hover:border-violet-200 text-slate-600'}`}>
                        <input type="radio" name="deliveryMethod" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="hidden" />
                        <Store className="w-5 h-5" /> <span className="font-semibold">Store Pickup</span>
                      </label>
                    </div>
                    
                    {deliveryMethod === 'delivery' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 anim-fade-up">
                        <input type="text" name="address" placeholder="Street Address *" value={checkoutData.address} onChange={handleInputChange} className={`md:col-span-2 ${inputClasses}`} required />
                        <input type="text" name="city" placeholder="City *" value={checkoutData.city} onChange={handleInputChange} className={`md:col-span-2 ${inputClasses}`} required />
                      </div>
                    )}
                  </section>

                  {/* Payment Details */}
                  <section>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-violet-600" /> Payment Details
                    </h3>
                    <div className="space-y-4">
                      <input type="text" name="cardNumber" placeholder="Card Number *" maxLength={19} value={checkoutData.cardNumber} onChange={handleInputChange} className={inputClasses} required />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="expiry" placeholder="MM/YY *" maxLength={5} value={checkoutData.expiry} onChange={handleInputChange} className={inputClasses} required />
                        <input type="text" name="cvv" placeholder="CVV *" maxLength={4} value={checkoutData.cvv} onChange={handleInputChange} className={inputClasses} required />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
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
                  <span className="font-medium text-slate-900">{deliveryMethod === 'pickup' ? 'Free (Pickup)' : 'Free'}</span>
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
                {isCheckout ? "Place Order" : "Proceed to Checkout"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
