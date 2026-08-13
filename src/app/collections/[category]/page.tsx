import { getProducts } from "@/lib/products";
import ProductCard from "@/components/Home/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  
  const products = await getProducts();
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <main className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <Link href="/collections" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Collections
      </Link>
      
      <div className="mb-12 text-center anim-fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 capitalize">
          {decodedCategory.replace("-", " ")}
        </h1>
        <p className="text-lg text-slate-500">
          {categoryProducts.length} items available
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categoryProducts.map((product, idx) => (
            <div 
              key={product.productId} 
              className="anim-slide-up"
              style={{ animationDelay: `${(idx % 12) * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </main>
  );
}
