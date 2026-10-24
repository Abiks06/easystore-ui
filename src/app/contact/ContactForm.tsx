"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

const TOPICS = ["An order", "A product", "Returns", "Something else"];

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  return (
    <div className="rounded-[2rem] bg-raised border border-line p-6 md:p-10 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
            <span className="mx-auto size-16 rounded-full bg-accent text-accent-fg grid place-items-center">
              <Check className="size-7" />
            </span>
            <p className="display text-5xl mt-6">Message sent.</p>
            <p className="text-muted mt-2">We&apos;ll get back to you shortly.</p>
            <button className="btn btn-ghost mt-8" onClick={() => setStatus("idle")}>
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              if (!String(data.get("name")).trim() || !/^\S+@\S+\.\S+$/.test(String(data.get("email"))) || String(data.get("message")).trim().length < 10) {
                setError("Please add your name, a valid email and a message of at least a sentence.");
                return;
              }
              setError("");
              setStatus("sending");
              await new Promise((r) => setTimeout(r, 900));
              setStatus("sent");
            }}
          >
            <fieldset>
              <legend className="text-sm mb-2">What&apos;s it about?</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button key={t} type="button" className="chip" data-active={topic === t} onClick={() => setTopic(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm mb-1.5">Name</span>
                <input name="name" className="field" autoComplete="name" />
              </label>
              <label className="block">
                <span className="block text-sm mb-1.5">Email</span>
                <input name="email" type="email" className="field" autoComplete="email" />
              </label>
            </div>
            {topic === "An order" && (
              <label className="block">
                <span className="block text-sm mb-1.5">Order number (optional)</span>
                <input name="order" className="field font-mono" placeholder="ES-XXXXXX" />
              </label>
            )}
            <label className="block">
              <span className="block text-sm mb-1.5">Message</span>
              <textarea name="message" rows={6} className="field h-auto py-3 resize-none" />
            </label>
            {error && (
              <p className="text-sm text-accent" role="alert">
                {error}
              </p>
            )}
            <button className="btn btn-primary w-full h-14 text-base" disabled={status === "sending"}>
              {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : "Send message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
