import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ShopExplorer from "@/components/shop/ShopExplorer";
import { getCategories, getCategory, getSummaries } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  return category ? { title: category.label, description: category.blurb } : {};
}

export default async function CollectionPage({ params }: PageProps<"/collections/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getSummaries().filter((p) => p.category === slug);
  const others = getCategories().filter((c) => c.slug !== slug);

  return (
    <>
      <header className="container-x pt-6 md:pt-10 pb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted mb-6">
          <Link href="/collections" className="hover:text-fg">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span className="text-fg">{category.label}</span>
        </nav>
        <div className="relative rounded-[2rem] overflow-hidden grain grid md:grid-cols-[1.2fr_1fr] items-end min-h-[320px]" style={{ background: category.tile }}>
          <div className="p-8 md:p-12 text-black relative z-10">
            <p className="eyebrow text-black/60! mb-4">{category.count} products</p>
            <h1 className="display text-7xl md:text-9xl">{category.label}</h1>
            <p className="mt-4 text-lg text-black/70 max-w-md">{category.blurb}</p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image src={category.cover} alt="" fill preload sizes="(min-width: 768px) 40vw, 90vw" className="object-contain p-8 md:p-10" />
          </div>
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {others.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="chip">
              <span className="size-2.5 rounded-full" style={{ background: c.tile }} />
              {c.label}
            </Link>
          ))}
        </div>
      </header>
      <Suspense fallback={<div className="container-x h-[60vh]" />}>
        <ShopExplorer products={products} lockedCategory={slug} />
      </Suspense>
    </>
  );
}
