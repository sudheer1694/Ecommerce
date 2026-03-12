import "../Css/ProductCard.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addWishlist } from "../features/wishlist/wishlistSlice";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  return (
    <div className="card">

      <img src={product.thumbnail} alt={product.title} />

      <h4>{product.title}</h4>
      <p className="card-description">{product.description}</p>
      <p className="card-price">₹{product.price}</p>

      <div className="card-actions">
        <button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
        <button
          className="wishlist-btn"
          onClick={() => dispatch(addWishlist(product))}
        >
          Add Wishlist
        </button>
      </div>

    </div>
  );
};

export default ProductCard;
