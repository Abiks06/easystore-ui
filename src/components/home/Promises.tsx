import { RotateCcw, ShieldCheck, Smartphone, Truck } from "lucide-react";
import { FREE_DELIVERY_THRESHOLD, formatPrice } from "@/lib/format";

const PROMISES = [
  { icon: Truck, title: "Free delivery in Accra", body: `On every order over ${formatPrice(FREE_DELIVERY_THRESHOLD)}. Same day before 2pm.` },
  { icon: Smartphone, title: "Pay with MoMo", body: "MTN, Telecel and AirtelTigo. Or pay on delivery." },
  { icon: RotateCcw, title: "30-day returns", body: "Changed your mind? Send it back, we'll sort it." },
  { icon: ShieldCheck, title: "Genuine, always", body: "Sourced from brands and authorised sellers only." },
];

export default function Promises() {
  return (
    <section className="container-x py-12">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-[1.5rem] overflow-hidden border border-line">
        {PROMISES.map(({ icon: Icon, title, body }) => (
          <li key={title} className="bg-bg p-6 md:p-8">
            <Icon className="size-6 text-accent" strokeWidth={1.5} />
            <p className="mt-5 font-medium">{title}</p>
            <p className="mt-1.5 text-sm text-muted leading-relaxed">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
