import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import "../Css/Cart.css";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const totalItems = cartItems.length;

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      <div className="cart-summary">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-details">
                <h4>{item.title}</h4>
                <p>₹{item.price}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
