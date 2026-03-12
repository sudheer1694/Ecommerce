import { useSelector, useDispatch } from "react-redux"

import { removeWishlist } from "../features/wishlist/wishlistSlice"

import "../Css/Wishlist.css"

const Wishlist = () => {

const { items } = useSelector(state => state.wishlist)

const dispatch = useDispatch()

return(

<div className="wishlist-container">

<h2>My Wishlist</h2>

{items.length === 0 ? (

<p>No items in wishlist</p>

) : (

<div className="wishlist-grid">

{items.map(product => (

<div key={product.id} className="wishlist-card">

<img src={product.thumbnail} alt={product.title}/>

<h4>{product.title}</h4>

<p>₹{product.price}</p>

<button
onClick={() => dispatch(removeWishlist(product.id))}
>
Remove
</button>

</div>

))}

</div>

)}

</div>

)

}

export default Wishlist
