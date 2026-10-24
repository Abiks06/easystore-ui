"use client";

import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useUI } from "@/store/ui";
import CartDrawer from "./CartDrawer";
import CommandMenu from "./CommandMenu";

export default function Providers({ children }: { children: React.ReactNode }) {
  const setSearchOpen = useUI((s) => s.setSearchOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(!useUI.getState().searchOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <MotionConfig reducedMotion="user">
      {children}
      <CartDrawer />
      <CommandMenu />
      <Toaster
        position="bottom-center"
        offset={24}
        toastOptions={{
          classNames: {
            toast: "bg-fg! text-bg! border-0! rounded-2xl! shadow-2xl! font-sans! text-sm! px-4! py-3! gap-3!",
            description: "text-bg/70!",
            actionButton: "bg-accent! text-accent-fg! rounded-full! px-3! font-medium!",
          },
        }}
      />
    </MotionConfig>
  );
}
