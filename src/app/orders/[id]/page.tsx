"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { useOrders } from "@/store/orders";
import { useHydrated } from "@/lib/use-hydrated";
import { categoryTile } from "@/lib/categories";
import { formatPrice } from "@/lib/format";

const TIMELINE = ["Order placed", "Packed", "Out for delivery", "Delivered"];

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const hydrated = useHydrated();
  const order = useOrders((s) => s.orders.find((o) => o.id === id));

  if (!hydrated) return <div className="container-x min-h-[70vh]" />;

  if (!order) {
    return (
      <div className="container-x pt-16 min-h-[60vh] text-center">
        <p className="display text-6xl">We can&apos;t find that order.</p>
        <p className="text-muted mt-3">Orders are kept on the device they were placed on.</p>
        <Link href="/account" className="btn btn-primary mt-8">
          Your orders
        </Link>
      </div>
    );
  }

  const first = order.contact.name.split(" ")[0];
  const pickup = order.fulfilment.method === "pickup";

  return (
    <div className="container-x pt-12 md:pt-20 max-w-4xl">
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="size-20 rounded-full bg-accent text-accent-fg grid place-items-center"
      >
        <Check className="size-9" strokeWidth={2.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="display text-6xl md:text-8xl mt-8"
      >
        Thank you, <em>{first}.</em>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-lg text-muted max-w-xl">
        Your order is in. We&apos;ve sent a confirmation to {order.contact.email}
        {pickup ? " and we'll text you when it's ready to collect." : " and we'll text you when it's on the way."}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10 rounded-[1.75rem] border border-line overflow-hidden">
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
          <Info label="Order number">
            <button
              className="inline-flex items-center gap-2 font-mono hover:text-accent"
              onClick={() => {
                navigator.clipboard?.writeText(order.id);
                toast("Order number copied");
              }}
            >
              {order.id} <Copy className="size-3.5" />
            </button>
          </Info>
          <Info label={pickup ? "Collect from" : "Delivering to"}>
            {pickup ? "EasyStore Osu, Accra" : `${order.fulfilment.address}, ${order.fulfilment.city}`}
          </Info>
          <Info label="Payment">
            {order.payment.method === "momo" ? order.payment.network : pickup ? "Pay at the counter" : "Pay on delivery"}
          </Info>
        </div>

        <div className="border-t border-line p-6">
          <ol className="grid grid-cols-4 gap-2">
            {TIMELINE.map((label, i) => (
              <li key={label} className="text-xs">
                <motion.span
                  className={`block h-1 rounded-full origin-left ${i === 0 ? "bg-accent" : "bg-surface"}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                />
                <span className={`block mt-2 ${i === 0 ? "" : "text-muted"}`}>{pickup && i === 2 ? "Ready to collect" : pickup && i === 3 ? "Collected" : label}</span>
              </li>
            ))}
          </ol>
        </div>

        <ul className="border-t border-line divide-y divide-line">
          {order.lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-4 p-4 px-6">
              <span className="relative size-14 rounded-xl overflow-hidden shrink-0" style={{ background: categoryTile(product.category) }}>
                <Image src={product.image} alt="" fill sizes="56px" className="object-contain p-1" />
              </span>
              <span className="flex-1 min-w-0 text-sm">
                <span className="block font-medium truncate">{product.title}</span>
                <span className="block text-muted text-xs">Qty {quantity}</span>
              </span>
              <span className="text-sm tabular-nums">{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="border-t border-line p-6 space-y-2 text-sm bg-raised">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{pickup ? "Pickup" : "Delivery"}</dt>
            <dd className="tabular-nums">{order.delivery ? formatPrice(order.delivery) : "Free"}</dd>
          </div>
          <div className="flex justify-between text-lg font-medium pt-2">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </motion.div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/shop" className="btn btn-primary h-14 px-8">
          Keep shopping
        </Link>
        <Link href="/account" className="btn btn-ghost h-14 px-8">
          View all orders
        </Link>
      </div>
    </div>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-6">
      <p className="eyebrow mb-2">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  );
}
