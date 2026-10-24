"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { selectCount, useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useUI } from "@/store/ui";
import { useHydrated } from "@/lib/use-hydrated";
import { toggleTheme, useTheme } from "./theme";
import Wordmark from "./Wordmark";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/shop?sale=1", label: "Deals" },
  { href: "/about", label: "About" },
];

const ANNOUNCEMENTS = [
  "Free delivery across Accra on orders over GH₵500",
  "Pay with MTN MoMo, Telecel Cash or AirtelTigo Money",
  "30-day returns, no awkward questions",
];

export default function Header() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const saved = useWishlist((s) => s.items.length);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const setSearchOpen = useUI((s) => s.setSearchOpen);
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(0);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setAnnouncement((i) => (i + 1) % ANNOUNCEMENTS.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    return href.includes("?") ? false : pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <>
      <div className="bg-fg text-bg h-9 overflow-hidden relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={announcement}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 grid place-items-center text-xs tracking-wide px-4 text-center"
          >
            {ANNOUNCEMENTS[announcement]}
          </motion.p>
        </AnimatePresence>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
          scrolled ? "bg-bg/80 backdrop-blur-xl border-line" : "bg-bg border-transparent"
        }`}
      >
        <div className="container-x h-16 md:h-18 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              className="icon-btn md:hidden -ml-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="size-5" />
            </button>
            <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-2 text-sm text-muted hover:text-fg transition-colors"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className={isActive(item.href) ? "text-fg" : undefined}>{item.label}</span>
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-px h-px bg-fg"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" aria-label="EasyStore home" className="justify-self-center">
            <Wordmark className="text-[1.75rem] md:text-[2rem]" />
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-3 h-10 pl-4 pr-2 mr-2 rounded-full border border-line text-sm text-muted hover:border-fg hover:text-fg transition-colors"
            >
              <Search className="size-4" />
              <span>Search</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-surface">⌘K</kbd>
            </button>
            <button className="icon-btn lg:hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="size-5" />
            </button>
            <button className="icon-btn hidden sm:inline-grid" onClick={toggleTheme} aria-label="Toggle dark mode">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link href="/account#saved" className="icon-btn relative hidden sm:inline-grid" aria-label={`Saved items (${saved})`}>
              <Heart className="size-5" />
              {hydrated && saved > 0 && <Badge value={saved} />}
            </Link>
            <button
              className="icon-btn relative -mr-2"
              onClick={() => setCartOpen(true)}
              aria-label={`Open bag (${hydrated ? count : 0} items)`}
            >
              <ShoppingBag className="size-5" />
              {hydrated && count > 0 && <Badge value={count} accent />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-fg text-bg flex flex-col md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x h-16 flex items-center justify-between">
              <Wordmark className="text-[1.75rem]" />
              <button className="icon-btn text-bg! hover:bg-bg/10!" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="size-5" />
              </button>
            </div>
            <nav className="container-x flex-1 flex flex-col justify-center gap-2">
              {[{ href: "/", label: "Home" }, ...NAV, { href: "/account", label: "Account" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={item.href} className="display text-6xl block py-1 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-x pb-10 flex items-center justify-between text-sm text-bg/60">
              <button onClick={toggleTheme} className="flex items-center gap-2 hover:text-bg">
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <span>Accra, Ghana</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Badge({ value, accent }: { value: number; accent?: boolean }) {
  return (
    <motion.span
      key={value}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 600, damping: 15 }}
      className={`absolute top-0.5 right-0.5 min-w-4.5 h-4.5 px-1 rounded-full grid place-items-center text-[10px] font-semibold tabular-nums ${
        accent ? "bg-accent text-accent-fg" : "bg-fg text-bg"
      }`}
    >
      {value > 99 ? "99+" : value}
    </motion.span>
  );
}
