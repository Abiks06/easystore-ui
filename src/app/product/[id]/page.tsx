import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getRelated, toSummary } from "@/lib/catalog";
import { categoryLabel, categoryTile } from "@/lib/categories";
import ProductGallery from "@/components/product/ProductGallery";
import PurchasePanel from "@/components/product/PurchasePanel";
import ProductRail from "@/components/product/ProductRail";
import { Rating } from "@/components/product/bits";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps<"/product/[id]">): Promise<Metadata> {
  const product = getProduct(Number((await params).id));
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [product.images[0] ?? product.thumbnail] },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[id]">) {
  const product = getProduct(Number((await params).id));
  if (!product) notFound();

  const summary = toSummary(product);
  const tile = categoryTile(product.category);
  const { width, height, depth } = product.dimensions;

  const details = [
    {
      title: "Details",
      rows: [
        ["Brand", product.brand ?? "EasyStore"],
        ["Category", categoryLabel(product.category)],
        ["SKU", product.sku],
        ["Dimensions", `${width} × ${height} × ${depth} cm`],
        ["Weight", `${product.weight} kg`],
      ] as [string, string][],
    },
    {
      title: "Delivery & returns",
      rows: [
        ["Shipping", product.shippingInformation],
        ["Returns", product.returnPolicy],
        ["Minimum order", `${product.minimumOrderQuantity} unit${product.minimumOrderQuantity === 1 ? "" : "s"}`],
      ] as [string, string][],
    },
    { title: "Warranty", rows: [["Coverage", product.warrantyInformation]] as [string, string][] },
  ];

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: product.reviews.filter((r) => Math.round(r.rating) === stars).length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews.length },
    offers: {
      "@type": "Offer",
      priceCurrency: "GHS",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="container-x pt-6 md:pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted mb-6 flex flex-wrap gap-x-2">
          <Link href="/shop" className="hover:text-fg">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/collections/${product.category}`} className="hover:text-fg">
            {categoryLabel(product.category)}
          </Link>
          <span>/</span>
          <span className="text-fg truncate max-w-[50vw]">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <ProductGallery images={product.images.length ? product.images : [product.thumbnail]} title={product.title} tile={tile} />
          </div>
          <PurchasePanel product={summary} description={product.description} details={details} />
        </div>
      </div>

      <section id="reviews" className="container-x mt-24 md:mt-32 scroll-mt-24">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="eyebrow mb-3">Reviews</p>
            <p className="display text-8xl tabular-nums">{product.rating.toFixed(1)}</p>
            <div className="mt-2">
              <Rating value={product.rating} count={product.reviews.length} size="md" />
            </div>
            <ul className="mt-8 space-y-2 max-w-xs">
              {distribution.map(({ stars, count }) => (
                <li key={stars} className="flex items-center gap-3 text-sm">
                  <span className="w-3 tabular-nums">{stars}</span>
                  <span className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
                    <span
                      className="block h-full bg-fg rounded-full"
                      style={{ width: `${product.reviews.length ? (count / product.reviews.length) * 100 : 0}%` }}
                    />
                  </span>
                  <span className="w-4 text-muted tabular-nums text-right">{count}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {product.reviews.map((r, i) => (
              <li key={i} className="py-8 grid sm:grid-cols-[180px_1fr] gap-3 sm:gap-8">
                <div>
                  <p className="font-medium">{r.reviewerName}</p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}
                  </p>
                </div>
                <div>
                  <Rating value={r.rating} />
                  <p className="display text-3xl mt-3">“{r.comment}”</p>
                  <p className="text-xs text-success mt-3">✓ Verified purchase</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProductRail eyebrow="Keep browsing" title={<>You might <em>also like</em></>} products={getRelated(product)} href={`/collections/${product.category}`} />
    </>
  );
}
