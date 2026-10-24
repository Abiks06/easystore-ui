import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about an order, a product or a return? Send us a note.",
};

const FAQ = [
  ["How fast is delivery?", "Orders placed before 2pm are delivered the same day within Accra. Elsewhere in Ghana it's usually 1–3 working days."],
  ["Which payment methods do you take?", "MTN MoMo, Telecel Cash and AirtelTigo Money at checkout, or card and cash on delivery."],
  ["Can I return something?", "Yes, within 30 days. Bring it to the store or we'll arrange a pickup. Refunds go back to the wallet or card you paid with."],
  ["Do I need an account?", "No. Your orders and saved items are remembered on your device, and checkout fills in your details next time."],
];

export default function ContactPage() {
  return (
    <div className="container-x pt-12 md:pt-16">
      <p className="eyebrow mb-6">Contact</p>
      <h1 className="display text-7xl md:text-9xl">
        Say <em>hello.</em>
      </h1>

      <div className="mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
        <div className="space-y-10">
          <ul className="space-y-6">
            {[
              { icon: MapPin, title: "Visit", body: "EasyStore counter, Oxford Street, Osu, Accra" },
              { icon: Clock, title: "Hours", body: "Mon–Sat, 9am–7pm · Sun, 12pm–5pm" },
              { icon: MessageCircle, title: "Reply time", body: "Usually within a couple of hours, always within a day" },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="size-11 rounded-full bg-surface grid place-items-center shrink-0">
                  <Icon className="size-5 text-accent" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block font-medium">{title}</span>
                  <span className="block text-muted text-sm mt-0.5">{body}</span>
                </span>
              </li>
            ))}
          </ul>

          <div>
            <h2 className="display text-4xl mb-4">Common questions</h2>
            <div className="border-t border-line">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group border-b border-line">
                  <summary className="py-5 flex items-center justify-between gap-4 cursor-pointer list-none font-medium [&::-webkit-details-marker]:hidden">
                    {q}
                    <span className="size-6 rounded-full border border-line grid place-items-center text-sm transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 text-muted leading-relaxed -mt-1">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
