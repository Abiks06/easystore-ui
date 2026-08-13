"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Tag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

const navLinks = ["Home", "Shop", "Collections", "About", "Contact"];

export default function Header() {
  const pathname = usePathname();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="anim-header sticky top-0 z-50 pt-4 px-6 pb-2">
      <div className="glass max-w-6xl mx-auto px-6 py-3 rounded-2xl flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group no-underline">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500 shadow-md group-hover:shadow-violet-300/50 transition-shadow duration-300">
            <Tag className="text-white w-4 h-4" />
          </span>
          <span className="brand-shimmer text-xl font-bold tracking-tight">
            Abiks' Store
          </span>
        </Link>

        {/* Nav */}
        <nav>
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((item) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === path;

              return (
                <li key={item}>
                  <Link
                    href={path}
                    className={`relative px-4 py-2 text-sm font-medium no-underline rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-violet-700"
                        : "text-slate-600 hover:text-violet-700 hover:bg-violet-50/50"
                    }`}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-violet-100/60 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
            
            {mounted && user ? (
              <li>
                <button
                  onClick={logout}
                  className="relative px-4 py-2 text-sm font-medium no-underline rounded-lg transition-colors duration-200 text-slate-600 hover:text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </li>
            ) : mounted && !user ? (
              <li>
                <Link
                  href="/login"
                  className={`relative px-4 py-2 text-sm font-medium no-underline rounded-lg transition-colors duration-200 ${
                    pathname === "/login"
                      ? "text-violet-700"
                      : "text-slate-600 hover:text-violet-700 hover:bg-violet-50/50"
                  }`}
                >
                  Login
                  {pathname === "/login" && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-violet-100/60 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ) : null}

            <li>
              <Link
                href="/cart"
                className="anim-pulse-ring flex items-center gap-2 ml-2 px-4 py-2 text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-fuchsia-500 rounded-xl shadow-md hover:shadow-violet-300/50 hover:scale-105 transition-all duration-300 no-underline group relative"
              >
                <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                Cart
                {mounted && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
