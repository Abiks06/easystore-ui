"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Tag, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="anim-header sticky top-0 z-50 pt-4 px-4 md:px-6 pb-2">
      <div className="glass max-w-6xl mx-auto px-4 sm:px-6 py-4 rounded-2xl flex items-center justify-between relative">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group no-underline z-50 relative">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 shadow-sm group-hover:bg-zinc-800 transition-colors duration-300">
            <Tag className="text-white w-4 h-4" />
          </span>
          <span className="text-xl font-bold tracking-tight text-zinc-900">
            Abiks' Store
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
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
                        ? "text-zinc-900 font-semibold"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50"
                    }`}
                  >
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-zinc-100 rounded-lg -z-10"
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
                  className="relative px-4 py-2 text-sm font-medium no-underline rounded-lg transition-colors duration-200 text-zinc-500 hover:text-red-600 hover:bg-red-50/50"
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
                      ? "text-zinc-900 font-semibold"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50"
                  }`}
                >
                  Login
                  {pathname === "/login" && (
                    <motion.div
                      layoutId="active-nav-login"
                      className="absolute inset-0 bg-zinc-100 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ) : null}

            <li>
              <Link
                href="/cart"
                className="flex items-center gap-2 ml-4 px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors duration-300 no-underline group relative"
              >
                <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Cart
                {mounted && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-zinc-100 text-zinc-900 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-zinc-200 shadow-sm">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden z-50 relative">
          <Link
            href="/cart"
            className="flex items-center justify-center w-10 h-10 text-zinc-900 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors duration-300 relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {getTotalItems()}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-900 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl border border-zinc-100 shadow-xl rounded-2xl p-4 flex flex-col gap-2 z-40 md:hidden"
            >
              {navLinks.map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                const isActive = pathname === path;
                return (
                  <Link
                    key={item}
                    href={path}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
              
              <div className="h-px bg-zinc-100 my-2" />
              
              {mounted && user ? (
                <button
                  onClick={logout}
                  className="px-4 py-3 text-sm font-medium text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Logout
                </button>
              ) : mounted && !user ? (
                <Link
                  href="/login"
                  className="px-4 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl transition-colors"
                >
                  Login
                </Link>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
