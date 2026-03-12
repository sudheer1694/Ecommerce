import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../features/products/productSlice";

import ProductList from "../Components/ProductList";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/Searchbar";
import SidebarFilter from "../Components/SidebarFilter";

import "../Css/Home.css";

const Home = () => {

const dispatch = useDispatch()

const { products } = useSelector(state => state.products)

const [currentPage,setCurrentPage] = useState(1)

const [search,setSearch] = useState("")

const [priceRange,setPriceRange] = useState(null)
const productsPerPage = 8

useEffect(()=>{

dispatch(fetchProducts())

},[dispatch])

let filteredProducts = products.filter(product =>
product.title.toLowerCase().includes(search.toLowerCase())
)

if(priceRange){

filteredProducts = filteredProducts.filter(product =>
product.price >= priceRange[0] && product.price <= priceRange[1]
)

}

const lastIndex = currentPage * productsPerPage
const firstIndex = lastIndex - productsPerPage
const currentProducts = filteredProducts.slice(firstIndex,lastIndex)

return(

<div className="home-container">

<h1 className="products-title">Products</h1>

<SearchBar setSearch={(value) => {
setSearch(value)
setCurrentPage(1)
}}/>

<div className="content">

<aside className="sidebar-panel">
<SidebarFilter
priceRange={priceRange}
setPriceRange={(value) => {
setPriceRange(value)
setCurrentPage(1)
}}
/>
</aside>

<div className="products-section">

<ProductList products={currentProducts}/>

<Pagination
totalProducts={filteredProducts.length}
productsPerPage={productsPerPage}
setCurrentPage={setCurrentPage}
/>

</div>

</div>

</div>

)

}

export default Home;
