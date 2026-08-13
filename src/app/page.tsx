import Hero from "@/components/Home/Hero";
import ProductListing from "@/components/Home/ProductListing";

export const dynamic = "force-dynamic"; // Ensures the page is always dynamically rendered

export default async function Home() {
  // We use localhost for development. In production, this should be an environment variable.
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  let products = [];
  try {
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
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
