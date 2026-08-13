import { getProducts } from "@/lib/products";
import ProductCard from "@/components/Home/ProductCard";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const products = await getProducts();
  
  // Group products by category
  const groupedProducts = products.reduce((acc: any, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const categories = Object.keys(groupedProducts).sort();

  return (
    <main className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 text-center anim-fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Collections
        </h1>
        <p className="text-lg text-slate-500">
          Explore our products organized by category.
        </p>
      </div>

      {categories.map((category, idx) => (
        <div key={category} className="mb-24 anim-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-bold text-slate-900 capitalize tracking-tight">
              {category.replace("-", " ")}
            </h2>
            <span className="text-sm font-medium px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
              {groupedProducts[category].length} items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {groupedProducts[category].slice(0, 4).map((product: any) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
          
          {groupedProducts[category].length > 4 && (
            <div className="mt-8 text-center">
              <a href={`/shop`} className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                View more {category}
              </a>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
