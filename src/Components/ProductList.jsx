import ProductCard from "./ProductCard";
import "../Css/ProductList.css";

const ProductList = ({ products }) => {

  return (
    <div className="product-grid">

      {products.map(product => (
        <ProductCard key={product.id} product={product}/>
      ))}

    </div>
  );

};

export default ProductList;
