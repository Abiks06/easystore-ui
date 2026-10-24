import data from "./data.json";
import { CATEGORY_META } from "./categories";
import type { Category, Product, ProductSummary } from "./types";

const products = data.products as Product[];

/** Discounts below this are treated as list price; above it we show a sale. */
const SALE_THRESHOLD = 15;

export function toSummary(p: Product): ProductSummary {
  const onSale = p.discountPercentage >= SALE_THRESHOLD;
  return {
    id: p.id,
    title: p.title,
    brand: p.brand ?? null,
    category: p.category,
    price: p.price,
    compareAt: onSale ? Math.round(p.price / (1 - p.discountPercentage / 100)) : null,
    discount: onSale ? Math.round(p.discountPercentage) : 0,
    rating: p.rating,
    reviewCount: p.reviews.length,
    stock: p.stock,
    image: p.images[0] ?? p.thumbnail,
    hoverImage: p.images[1] ?? null,
  };
}

export function getProducts() {
  return products;
}

export function getSummaries() {
  return products.map(toSummary);
}

export function getProduct(id: number) {
  return products.find((p) => p.id === id);
}

export function getCategories(): Category[] {
  const counts = new Map<string, Product[]>();
  for (const p of products) {
    counts.set(p.category, [...(counts.get(p.category) ?? []), p]);
  }
  return [...counts.entries()]
    .map(([slug, items]) => {
      const meta = CATEGORY_META[slug];
      // The best-rated item makes the most convincing cover shot.
      const cover = [...items].sort((a, b) => b.rating - a.rating)[0];
      return {
        slug,
        label: meta?.label ?? slug,
        blurb: meta?.blurb ?? "",
        tile: meta?.tile ?? "#E4DFD4",
        count: items.length,
        cover: cover.images[0] ?? cover.thumbnail,
      };
    })
    .sort((a, b) => b.count - a.count);
}

export function getCategory(slug: string) {
  return getCategories().find((c) => c.slug === slug);
}

/** Popularity blends rating with how many people bothered to review. */
function score(p: Product) {
  return p.rating * Math.log2(p.reviews.length + 2);
}

export function getTrending(limit = 10) {
  return [...products].sort((a, b) => score(b) - score(a)).slice(0, limit).map(toSummary);
}

export function getDeals(limit = 8) {
  return [...products]
    .filter((p) => p.discountPercentage >= SALE_THRESHOLD)
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, limit)
    .map(toSummary);
}

/** Rotates daily so the deal feels alive without a backend. */
export function getDealOfTheDay(date = new Date()) {
  const deals = getDeals(8);
  const day = Math.floor(date.getTime() / 86_400_000);
  return getProduct(deals[day % deals.length].id)!;
}

export function getRelated(product: Product, limit = 8) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const filler = products.filter((p) => p.category !== product.category && p.tags.some((t) => product.tags.includes(t)));
  return [...sameCategory, ...filler].slice(0, limit).map(toSummary);
}

/** Happy reviews with no repeated reviewer or comment, spread across categories. */
export function getRecentReviews(limit = 6) {
  const seenNames = new Set<string>();
  const seenComments = new Set<string>();
  const seenCategories = new Set<string>();
  const picked = [];
  for (const p of [...products].sort((a, b) => score(b) - score(a))) {
    if (seenCategories.has(p.category)) continue;
    const review = p.reviews.find(
      (r) => r.rating >= 4 && !seenNames.has(r.reviewerName) && !seenComments.has(r.comment),
    );
    if (!review) continue;
    seenNames.add(review.reviewerName);
    seenComments.add(review.comment);
    seenCategories.add(p.category);
    picked.push({ ...review, product: toSummary(p) });
    if (picked.length === limit) break;
  }
  return picked;
}
