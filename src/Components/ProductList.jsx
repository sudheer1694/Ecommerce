import ProductCard from "./ProductCard";
import "../Css/ProductList.css";

// Renders either a skeleton grid (while loading) or the real product cards.
const ProductList = ({ products, loading }) => {

  // When data is loading, show a fixed number of skeleton cards to preserve layout
  // and give users visual feedback instead of a blank screen.
  if (loading) {
    return (
      <div className="product-grid">
        {/* Create 8 placeholder cards to match the grid layout. */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="card skeleton-card">
            {/* Image placeholder */}
            <div className="skeleton-img" />
            {/* Title and description placeholders */}
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            {/* Price placeholder */}
            <div className="skeleton-line price" />
            {/* Button placeholders to mimic action layout */}
            <div className="skeleton-actions">
              <div className="skeleton-line button" />
              <div className="skeleton-line button" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // When not loading, render the real products.
  return (
    <div className="product-grid">

      {products.map(product => (
        <ProductCard key={product.id} product={product}/>
      ))}

    </div>
  );

};

export default ProductList;
