import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CategoryBento from "@/components/home/CategoryBento";
import DealOfTheDay from "@/components/home/DealOfTheDay";
import Editorial from "@/components/home/Editorial";
import Reviews from "@/components/home/Reviews";
import Promises from "@/components/home/Promises";
import ProductRail from "@/components/product/ProductRail";
import {
  getCategories,
  getDealOfTheDay,
  getDeals,
  getProducts,
  getRecentReviews,
  getSummaries,
  getTrending,
  toSummary,
} from "@/lib/catalog";
import { CATEGORY_META } from "@/lib/categories";

// Re-render hourly so the deal of the day rolls over without a redeploy.
export const revalidate = 3600;

export default function Home() {
  const all = getProducts();
  const categories = getCategories();
  const trending = getTrending(10);
  const deal = getDealOfTheDay();
  const kitchen = getSummaries()
    .filter((p) => p.category === "kitchen-accessories")
    .sort((a, b) => b.rating - a.rating);

  // Hero collage: one standout from four different categories.
  const heroPicks = trending.filter((p, i, arr) => arr.findIndex((q) => q.category === p.category) === i).slice(0, 4);

  return (
    <>
      <Hero
        products={heroPicks}
        stats={{
          products: all.length,
          categories: categories.length,
          brands: new Set(all.map((p) => p.brand).filter(Boolean)).size,
        }}
      />
      <Marquee items={categories.map((c) => c.label)} />
      <ProductRail eyebrow="Most loved" title={<>Trending <em>right now</em></>} products={trending} href="/shop?sort=popular" />
      <CategoryBento categories={categories} />
      <DealOfTheDay product={toSummary(deal)} description={deal.description} />
      <Editorial
        eyebrow="The kitchen edit"
        title={
          <>
            Cook like <em>you mean it.</em>
          </>
        }
        body="Thirty hard-working tools, from the pan you'll reach for every morning to the gadget you didn't know you needed. Tested in real kitchens, not just photographed in them."
        href="/collections/kitchen-accessories"
        tile={CATEGORY_META["kitchen-accessories"].tile}
        products={kitchen}
      />
      <ProductRail eyebrow="Markdowns" title={<>On sale, <em>not for long</em></>} products={getDeals(10)} href="/shop?sale=1" />
      <Reviews reviews={getRecentReviews(6)} />
      <Promises />
    </>
  );
}
