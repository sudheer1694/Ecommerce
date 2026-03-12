import "../Css/Navbar.css";
import { Link } from "react-router-dom";

import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";

const Navbar = () => {

  return (
    <nav className="navbar">

      <h2>Shop</h2>

      <div className="nav-links">
        <Link to="/products"><FaBoxOpen /> Products</Link>
        <Link to="/wishlist"><FaHeart /> Wishlist</Link>
        <Link to="/cart"><FaShoppingCart /> Cart</Link>
        <Link to="/login"><FaUser /> Login</Link>
      </div>

    </nav>
  );
};

export default Navbar;
