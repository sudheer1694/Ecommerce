import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import "../Css/Searchbar.css";

const SearchBar = ({ setSearch }) => {
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) => state.cart.cartItems.length);

  return (
    <div className="search-bar-wrap">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by title"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="quick-actions">
        <Link to="/wishlist" className="quick-btn">
          <FaHeart /> {wishlistCount}
        </Link>
        <Link to="/cart" className="quick-btn">
          <FaShoppingCart /> {cartCount}
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
