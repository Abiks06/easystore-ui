import Hero from "@/components/Home/Hero";
import ProductListing from "@/components/Home/ProductListing";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic"; // Ensures the page is always dynamically rendered

export default async function Home() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="relative">
      <Hero />
      <ProductListing products={products} />
    </div>
  );
}
