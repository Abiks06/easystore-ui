import ProductCard from "./ProductCard";

const STAGGER_CLASSES = ["anim-card-1","anim-card-2","anim-card-3","anim-card-4","anim-card-5"];

function ProductListing({ products = [] }) {
  return (
    <section className="bg-slate-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="anim-fade-up flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-700">
            All Products
            <span className="ml-2 text-sm font-medium text-slate-400">({products.length} items)</span>
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div key={product.productId} className={STAGGER_CLASSES[i] ?? "anim-card-5"}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="anim-fade-up flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-lg font-semibold text-slate-500">No products found</p>
            <p className="text-sm text-slate-400 mt-1">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductListing;