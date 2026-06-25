import ProductCard from "./ProductCard";

function ProductListing({ products = [] }) {
  return (
    <div className="product-list-container">
      <div className="product-list-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="product-listings-empty">No products found</p>
        )}
      </div>
    </div>
  );
}

export default ProductListing;