"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-8 flex items-center gap-2 p-1.5 pl-5 rounded-full border border-bg/20 focus-within:border-bg/60 transition-colors"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          toast.error("That email doesn't look quite right");
          return;
        }
        setDone(true);
        setEmail("");
        toast.success("You're on the list", { description: "First letter lands next month." });
      }}
    >
      <label htmlFor="newsletter" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 min-w-0 bg-transparent text-sm placeholder:text-bg/40 outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="size-10 shrink-0 rounded-full bg-accent text-accent-fg grid place-items-center hover:scale-105 active:scale-95 transition-transform"
      >
        {done ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
