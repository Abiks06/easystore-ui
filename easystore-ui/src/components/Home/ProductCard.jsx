import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faStar } from "@fortawesome/free-solid-svg-icons";
import Price from "./Price";

function ProductCard({ product }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
      {/* Stock badge */}
      {!product.inStock && (
        <span className="absolute top-3 left-3 z-10 text-xs font-bold px-2 py-1 rounded-lg bg-red-100 text-red-600">
          Out of Stock
        </span>
      )}

      {/* Category badge */}
      <span className="absolute top-3 right-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700">
        {product.category}
      </span>

      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <img
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          src={product.imageUrl}
          alt={product.productName}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        <h3 className="text-base font-bold text-slate-800 leading-snug">
          {product.productName}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1">
          <FontAwesomeIcon icon={faStar} className="text-amber-400 text-xs" />
          <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviewCount} reviews)</span>
        </div>

        <Price currency="GH₵" price={product.price} />

        <button
          disabled={!product.inStock}
          className="group mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-indigo-500 shadow hover:shadow-violet-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer"
        >
          <FontAwesomeIcon icon={faShoppingBasket} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125 group-disabled:group-hover:rotate-0 group-disabled:group-hover:scale-100" />
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;