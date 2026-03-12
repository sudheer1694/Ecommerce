// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import { signupUser } from "../features/auth/authSlice"

// import "../Css/Signup.css"

// const Signup = () => {

// const dispatch = useDispatch()
// const navigate = useNavigate()

// const [formData,setFormData] = useState({

// firstName:"",
// lastName:"",
// username:"",
// email:"",
// password:"",
// confirmPassword:"",
// joinAsSeller:false

// })

// const handleChange=(e)=>{

// const {name,value,type,checked}=e.target

// setFormData({

// ...formData,
// [name]:type==="checkbox"?checked:value

// })

// }

// const handleSubmit=(e)=>{

// e.preventDefault()

// if (formData.password !== formData.confirmPassword) {
// alert("Password and confirm password must match.")
// return
// }

// dispatch(signupUser(formData))
// .unwrap()
// .then(() => {
// navigate("/login")
// })
// .catch((errorMessage) => {
// alert(errorMessage || "Signup failed. Please check your details and try again.")
// })

// }

// return(

// <div className="auth-page">
// <div className="signup-container auth-card">

// <h2>Create Account</h2>

// <form onSubmit={handleSubmit} className="auth-form">

// <input
// name="firstName"
// placeholder="First Name"
// onChange={handleChange}
// required
// />

// <input
// name="lastName"
// placeholder="Last Name"
// onChange={handleChange}
// required
// />

// <input
// name="username"
// placeholder="Username"
// onChange={handleChange}
// required
// />

// <input
// name="email"
// placeholder="Email"
// onChange={handleChange}
// required
// />

// <input
// type="password"
// name="password"
// placeholder="Password"
// onChange={handleChange}
// required
// />

// <input
// type="password"
// name="confirmPassword"
// placeholder="Confirm Password"
// onChange={handleChange}
// required
// />

// <label className="checkbox-row">

// <input
// type="checkbox"
// name="joinAsSeller"
// onChange={handleChange}
// />

// Join as Seller

// </label>

// <button type="submit" className="auth-btn">

// Sign Up

// </button>

// <p className="auth-switch">
// Already have an account? <Link to="/login">Login</Link>
// </p>

// </form>

// </div>
// </div>

// )

// }

// export default Signup


import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { signupUser } from "../features/auth/authSlice"

import "../Css/Signup.css"

const Signup = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const [formData,setFormData] = useState({

firstName:"",
lastName:"",
username:"",
email:"",
password:"",
confirmPassword:"",
joinAsSeller:false

})

const handleChange=(e)=>{

const {name,value,type,checked}=e.target

setFormData({

...formData,
[name]:type==="checkbox"?checked:value

})

}

const handleSubmit=(e)=>{

e.preventDefault()

if(formData.password !== formData.confirmPassword){

alert("Passwords must match")
return

}

dispatch(signupUser(formData))
.unwrap()
.then(()=>{

setTimeout(()=>{

navigate("/login")

},1200)

})

}

return(

<div className="auth-page">

<div className="signup-container auth-card">

<h2>Create Account</h2>

<form onSubmit={handleSubmit} className="auth-form">

<input name="firstName" placeholder="First Name" onChange={handleChange} required/>

<input name="lastName" placeholder="Last Name" onChange={handleChange} required/>

<input name="username" placeholder="Username" onChange={handleChange} required/>

<input name="email" placeholder="Email" onChange={handleChange} required/>

<input type="password" name="password" placeholder="Password" onChange={handleChange} required/>

<input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>

<label className="checkbox-row">

<input type="checkbox" name="joinAsSeller" onChange={handleChange}/>

Join as Seller

</label>

<button type="submit" className="auth-btn">Sign Up</button>

<p className="auth-switch">

Already have an account? <Link to="/login">Login</Link>

</p>

</form>

</div>

</div>

)

}

export default Signup;