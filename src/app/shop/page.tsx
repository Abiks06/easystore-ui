import { getProducts } from "@/lib/products";
import ProductCard from "@/components/Home/ProductCard";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 text-center anim-fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          All Products
        </h1>
        <p className="text-lg text-slate-500">
          Browse our entire catalog of premium items.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, idx) => (
          <div 
            key={product.productId} 
            className="anim-slide-up"
            style={{ animationDelay: `${(idx % 12) * 50}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No products found.</p>
        </div>
      )}
    </main>
  );
}
