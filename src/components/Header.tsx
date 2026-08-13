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
      <div className="glass max-w-6xl mx-auto px-6 py-4 rounded-2xl flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group no-underline">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 shadow-sm group-hover:bg-zinc-800 transition-colors duration-300">
            <Tag className="text-white w-4 h-4" />
          </span>
          <span className="text-xl font-bold tracking-tight text-zinc-900">
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
                      layoutId="active-nav"
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
      </div>
    </header>
  );
}
