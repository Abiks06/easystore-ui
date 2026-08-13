import { getProducts } from "@/lib/products";
import Image from "next/image";
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const products = await getProducts();
  const product = products.find((p: any) => p.productId === parseInt(resolvedParams.id));

  if (!product) {
    notFound();
  }

  return (
    <main className="py-12 px-6 max-w-6xl mx-auto min-h-[75vh]">
      <Link href="/#products" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-700 transition-colors mb-10 no-underline">
        <ArrowLeft className="w-4 h-4" /> Back to store
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="anim-fade-up">
          <div className="glass-card aspect-square rounded-[2rem] p-8 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-tr from-violet-200/40 to-fuchsia-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Image 
              src={product.imageUrl} 
              alt={product.productName}
              width={500}
              height={500}
              className="object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 z-10"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col anim-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full tracking-wide uppercase">
              {product.category}
            </span>
            {!product.inStock && (
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full tracking-wide uppercase">
                Out of Stock
              </span>
            )}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {product.productName}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} 
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
            <span className="text-sm text-slate-500">({product.reviewCount} reviews)</span>
          </div>
          
          <p className="text-4xl font-bold text-violet-700 mb-8">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="prose prose-slate mb-10">
            <p className="text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>
          
          <div className="mt-auto">
            {/* Client Component for Add to Cart interactivity */}
            <ProductActions product={product} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-600">Free Worldwide<br/>Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-600">Secure<br/>Payments</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-600">30-Day<br/>Returns</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
