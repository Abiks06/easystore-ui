import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faArrowRight,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PageHeading from "../PageHeading";
import products from "../../Data/products";

export default function Cart() {
  // Simulating a cart with the first two items from our mock data
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 2 },
    { ...products[1], quantity: 1 },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.productId === id) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.productId !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <PageHeading title="Your Cart" />

      <div className="max-w-6xl mx-auto px-6 mt-8">
        {cartItems.length === 0 ? (
          <div className="anim-fade-up bg-white rounded-3xl border border-slate-100 shadow-sm p-16 text-center">
            <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={faShoppingBag}
                className="text-violet-300 text-4xl"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Looks like you haven't added any stickers to your cart yet. Let's
              get you some!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3 bg-linear-to-r from-violet-600 to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-300 no-underline"
            >
              Start Shopping <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {cartItems.map((item, index) => (
                <div
                  key={item.productId}
                  className="anim-slide-up flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative pr-12"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-24 h-24 rounded-xl bg-slate-50 flex items-center justify-center p-3 shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg mb-1">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      {item.category}
                    </p>
                    <div className="flex items-center gap-4">
                      {/* Quantity Control */}
                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-l-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-r-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-slate-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors p-2"
                    aria-label="Remove item"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="anim-fade-up bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-800 mb-6">
                  Order Summary
                </h3>
                <div className="flex flex-col gap-4 text-sm mb-6">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-800">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px w-full bg-slate-100 my-1" />
                  <div className="flex justify-between text-base font-bold text-slate-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="anim-pulse-ring w-full flex items-center justify-center gap-2 px-7 py-3.5 bg-linear-to-r from-violet-600 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-300">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
