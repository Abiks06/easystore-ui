"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, Check, Loader2, Lock, Smartphone, Store, Truck } from "lucide-react";
import { useState } from "react";
import { selectSubtotal, useCart } from "@/store/cart";
import { useOrders, type FulfilmentMethod, type PaymentMethod } from "@/store/orders";
import { useHydrated } from "@/lib/use-hydrated";
import { categoryTile } from "@/lib/categories";
import { deliveryFee, formatPrice } from "@/lib/format";

const REGIONS = ["Greater Accra", "Ashanti", "Central", "Eastern", "Western", "Volta", "Northern", "Bono"];
const NETWORKS = ["MTN MoMo", "Telecel Cash", "AirtelTigo Money"];

type Step = 0 | 1 | 2;
type Errors = Record<string, string>;

const PHONE = /^(\+?233|0)[235]\d{8}$/;
const EMAIL = /^\S+@\S+\.\S+$/;

export default function CheckoutPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const subtotal = useCart(selectSubtotal);
  const clear = useCart((s) => s.clear);
  const profile = useOrders((s) => s.profile);
  const place = useOrders((s) => s.place);

  const [step, setStep] = useState<Step>(0);
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [prefilled, setPrefilled] = useState(false);
  const [method, setMethod] = useState<FulfilmentMethod>("delivery");
  const [address, setAddress] = useState({ address: "", city: "", region: REGIONS[0] });
  const [payment, setPayment] = useState<PaymentMethod>("momo");
  const [network, setNetwork] = useState(NETWORKS[0]);
  const [momoNumber, setMomoNumber] = useState("");

  // Returning shoppers get their details filled in once the store has hydrated.
  if (hydrated && profile && !prefilled) {
    setPrefilled(true);
    setContact(profile);
    setMomoNumber(profile.phone);
  }

  const delivery = deliveryFee(subtotal, method);
  const total = subtotal + delivery;

  if (!hydrated) return <div className="container-x min-h-[70vh]" />;

  if (lines.length === 0 && !placing) {
    return (
      <div className="container-x pt-16 min-h-[60vh] text-center">
        <p className="display text-6xl">Your bag is empty.</p>
        <p className="text-muted mt-3">Add something lovely, then come back.</p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Go shopping
        </Link>
      </div>
    );
  }

  const validate = (s: Step): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (contact.name.trim().length < 2) e.name = "Tell us your name";
      if (!EMAIL.test(contact.email)) e.email = "Enter a valid email";
      if (!PHONE.test(contact.phone.replace(/\s/g, ""))) e.phone = "Use a Ghana number, e.g. 024 123 4567";
    }
    if (s === 1 && method === "delivery") {
      if (address.address.trim().length < 4) e.address = "Where should we deliver?";
      if (address.city.trim().length < 2) e.city = "Which town or city?";
    }
    if (s === 2 && payment === "momo" && !PHONE.test(momoNumber.replace(/\s/g, ""))) {
      e.momo = "Enter the number on your MoMo wallet";
    }
    return e;
  };

  const fix = (key: string) => {
    if (!errors[key]) return;
    setErrors((prev) => {
      const rest = { ...prev };
      delete rest[key];
      return rest;
    });
  };

  const next = (s: Step) => {
    const e = validate(s);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (s === 1 && !momoNumber) setMomoNumber(contact.phone);
    if (s < 2) setStep((s + 1) as Step);
    else submit();
  };

  const submit = async () => {
    setPlacing(true);
    // Simulates the MoMo prompt round trip.
    await new Promise((r) => setTimeout(r, 1600));
    const order = place({
      lines,
      subtotal,
      delivery,
      total,
      contact: { ...contact, phone: contact.phone.replace(/\s/g, "") },
      fulfilment: method === "delivery" ? { method, ...address } : { method },
      payment: { method: payment, network: payment === "momo" ? network : undefined },
    });
    router.push(`/orders/${order.id}`);
    clear();
  };

  return (
    <div className="container-x pt-10 md:pt-14">
      <div className="flex items-end justify-between gap-4 mb-10">
        <h1 className="display text-6xl md:text-8xl">Checkout</h1>
        <p className="hidden sm:flex items-center gap-2 text-sm text-muted mb-3">
          <Lock className="size-3.5" /> Secure checkout
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
        <div className="space-y-4">
          <StepCard
            index={0}
            step={step}
            title="Contact"
            summary={`${contact.name} · ${contact.email} · ${contact.phone}`}
            onEdit={() => setStep(0)}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.name} className="sm:col-span-2">
                <input className="field" autoComplete="name" value={contact.name} aria-invalid={!!errors.name} onChange={(e) => {
                  setContact({ ...contact, name: e.target.value });
                  fix("name");
                }} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input className="field" type="email" autoComplete="email" value={contact.email} aria-invalid={!!errors.email} onChange={(e) => {
                  setContact({ ...contact, email: e.target.value });
                  fix("email");
                }} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input className="field" type="tel" autoComplete="tel" placeholder="024 123 4567" value={contact.phone} aria-invalid={!!errors.phone} onChange={(e) => {
                  setContact({ ...contact, phone: e.target.value });
                  fix("phone");
                }} />
              </Field>
            </div>
            <ContinueButton onClick={() => next(0)}>Continue to delivery</ContinueButton>
          </StepCard>

          <StepCard
            index={1}
            step={step}
            title="Delivery"
            summary={method === "pickup" ? "Store pickup · Osu, Accra" : `${address.address}, ${address.city}, ${address.region}`}
            onEdit={() => setStep(1)}
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <OptionCard selected={method === "delivery"} onSelect={() => setMethod("delivery")} icon={Truck} title="Deliver to me" sub={deliveryFee(subtotal) ? `${formatPrice(deliveryFee(subtotal))} · 1–2 days` : "Free · 1–2 days"} />
              <OptionCard selected={method === "pickup"} onSelect={() => setMethod("pickup")} icon={Store} title="Pick up in store" sub="Free · Osu, Accra · ready in 2h" />
            </div>
            <AnimatePresence initial={false}>
              {method === "delivery" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="grid sm:grid-cols-2 gap-4 pt-5">
                    <Field label="Street address or digital address" error={errors.address} className="sm:col-span-2">
                      <input className="field" autoComplete="street-address" placeholder="e.g. 12 Oxford St or GA-123-4567" value={address.address} aria-invalid={!!errors.address} onChange={(e) => {
                  setAddress({ ...address, address: e.target.value });
                  fix("address");
                }} />
                    </Field>
                    <Field label="Town / city" error={errors.city}>
                      <input className="field" autoComplete="address-level2" value={address.city} aria-invalid={!!errors.city} onChange={(e) => {
                  setAddress({ ...address, city: e.target.value });
                  fix("city");
                }} />
                    </Field>
                    <Field label="Region">
                      <select className="field appearance-none" value={address.region} onChange={(e) => setAddress({ ...address, region: e.target.value })}>
                        {REGIONS.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <ContinueButton onClick={() => next(1)}>Continue to payment</ContinueButton>
          </StepCard>

          <StepCard index={2} step={step} title="Payment" summary="" onEdit={() => setStep(2)}>
            <div className="grid gap-3">
              <OptionCard selected={payment === "momo"} onSelect={() => setPayment("momo")} icon={Smartphone} title="Mobile Money" sub="We'll send a prompt to approve on your phone" />
              <OptionCard
                selected={payment === "card-on-delivery"}
                onSelect={() => setPayment("card-on-delivery")}
                icon={Banknote}
                title={method === "pickup" ? "Pay at the counter" : "Pay on delivery"}
                sub="Card or cash when your order arrives"
              />
            </div>
            <AnimatePresence initial={false}>
              {payment === "momo" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-5 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {NETWORKS.map((n) => (
                        <button key={n} type="button" className="chip" data-active={network === n} onClick={() => setNetwork(n)}>
                          {n}
                        </button>
                      ))}
                    </div>
                    <Field label="Wallet number" error={errors.momo}>
                      <input className="field" type="tel" placeholder="024 123 4567" value={momoNumber} aria-invalid={!!errors.momo} onChange={(e) => {
                  setMomoNumber(e.target.value);
                  fix("momo");
                }} />
                    </Field>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => next(2)} disabled={placing} className="btn btn-accent w-full h-14 mt-6 text-base">
              {placing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {payment === "momo" ? "Waiting for MoMo approval…" : "Placing order…"}
                </>
              ) : (
                <>Place order · {formatPrice(total)}</>
              )}
            </button>
            <p className="text-xs text-muted text-center mt-3">This is a demo store. No real payment is taken.</p>
          </StepCard>
        </div>

        <aside className="lg:sticky lg:top-24 rounded-[1.75rem] bg-surface p-6 md:p-8">
          <h2 className="display text-3xl mb-6">In your bag</h2>
          <ul className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-4">
                <span className="relative size-16 shrink-0 rounded-xl overflow-hidden" style={{ background: categoryTile(product.category) }}>
                  <Image src={product.image} alt="" fill sizes="64px" className="object-contain p-1.5" />
                  <span className="absolute -top-0 -right-0 min-w-5 h-5 px-1 rounded-bl-lg bg-fg text-bg text-[10px] grid place-items-center tabular-nums">{quantity}</span>
                </span>
                <span className="flex-1 min-w-0 text-sm">
                  <span className="block truncate font-medium">{product.title}</span>
                  <span className="block text-muted text-xs">{product.brand}</span>
                </span>
                <span className="text-sm tabular-nums">{formatPrice(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 pt-6 border-t border-line space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>{method === "pickup" ? "Pickup" : "Delivery"}</dt>
              <dd className="tabular-nums">{delivery ? formatPrice(delivery) : "Free"}</dd>
            </div>
            <div className="flex justify-between pt-3 mt-3 border-t border-line text-lg font-medium">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function StepCard({
  index,
  step,
  title,
  summary,
  onEdit,
  children,
}: {
  index: Step;
  step: Step;
  title: string;
  summary: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  const open = index === step;
  const done = index < step;
  return (
    <section className={`rounded-[1.75rem] border transition-colors ${open ? "border-fg bg-raised" : "border-line"}`}>
      <header className="flex items-center gap-4 p-6">
        <span
          className={`size-8 rounded-full grid place-items-center text-sm font-medium transition-colors ${
            done ? "bg-success text-white" : open ? "bg-fg text-bg" : "bg-surface text-muted"
          }`}
        >
          {done ? <Check className="size-4" /> : index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className={`font-medium ${!open && !done ? "text-muted" : ""}`}>{title}</h2>
          {done && summary && <p className="text-sm text-muted truncate">{summary}</p>}
        </div>
        {done && (
          <button onClick={onEdit} className="text-sm underline underline-offset-4 hover:text-accent">
            Edit
          </button>
        )}
      </header>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-sm mb-1.5">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="block text-xs text-accent mt-1.5" role="alert">
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function OptionCard({
  selected,
  onSelect,
  icon: Icon,
  title,
  sub,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-colors ${
        selected ? "border-fg bg-bg" : "border-line hover:border-muted"
      }`}
    >
      <Icon className="size-5 shrink-0" strokeWidth={1.5} />
      <span className="flex-1">
        <span className="block font-medium text-sm">{title}</span>
        <span className="block text-xs text-muted mt-0.5">{sub}</span>
      </span>
      <span className={`size-5 rounded-full border grid place-items-center ${selected ? "border-fg" : "border-line"}`}>
        {selected && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="size-2.5 rounded-full bg-fg" />}
      </span>
    </button>
  );
}

function ContinueButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="btn btn-primary h-12 mt-6 w-full sm:w-auto">
      {children}
    </button>
  );
}
