import Link from "next/link";
import { getCategories } from "@/lib/catalog";
import Newsletter from "./Newsletter";
import Wordmark from "./Wordmark";

export default function Footer() {
  const categories = getCategories();

  return (
    <footer className="mt-24 bg-fg text-bg relative overflow-hidden">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-md">
            <p className="display text-4xl md:text-5xl">
              Letters from the shop, <em className="text-accent">roughly monthly.</em>
            </p>
            <p className="mt-4 text-bg/60 text-sm leading-relaxed">
              New arrivals, restocks and the occasional deal that is actually good. No spam, unsubscribe in one click.
            </p>
            <Newsletter />
          </div>

          <FooterColumn title="Shop">
            {categories.slice(0, 6).map((c) => (
              <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
                {c.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="More">
            {categories.slice(6).map((c) => (
              <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
                {c.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Help">
            <FooterLink href="/about">About us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/account">Your orders</FooterLink>
            <FooterLink href="/shop?sale=1">Deals</FooterLink>
          </FooterColumn>
        </div>

        <div aria-hidden className="mt-24 -mb-[0.18em] select-none">
          <Wordmark className="block text-[clamp(5rem,22vw,22rem)] text-bg/95" />
        </div>

        <div className="mt-6 pt-6 border-t border-bg/15 flex flex-col sm:flex-row gap-3 justify-between text-xs text-bg/50">
          <p>© {new Date().getFullYear()} EasyStore, Accra. Prices in Ghana cedis.</p>
          <p>
            Built by{" "}
            <a href="https://github.com/Abiks06" target="_blank" rel="noreferrer" className="text-bg hover:text-accent transition-colors">
              Abiks06
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-bg/50!">{title}</p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-bg/80 hover:text-accent transition-colors">
        {children}
      </Link>
    </li>
  );
}
