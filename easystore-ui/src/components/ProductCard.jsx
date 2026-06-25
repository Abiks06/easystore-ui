import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import Price from "./Price";

function ProductCard({ product }) {
  return (
    <div className="product-list-card">
      <img
        className="product-list-image"
        src={product.imageUrl}
        alt={product.productName}
      />
      <div className="product-list-info">
        <h3 className="product-list-name">{product.productName}</h3>
        <p className="product-list-description">{product.description}</p>
        <Price currency="GH₵" price={product.price} />
        <button className="product-list-btn">
          Add to Cart <FontAwesomeIcon icon={faShoppingBasket} className="fa-icons" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;