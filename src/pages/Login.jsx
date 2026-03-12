// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { Link, useNavigate } from "react-router-dom"

// import { loginUser } from "../features/auth/authSlice"

// import "../Css/Login.css"

// const Login = () => {

// const dispatch = useDispatch()
// const navigate = useNavigate()

// const [email,setEmail] = useState("")
// const [password,setPassword] = useState("")

// const handleSubmit=(e)=>{

// e.preventDefault()

// dispatch(loginUser({

// email,
// password

// }))
// .unwrap()
// .then(() => {
// navigate("/products")
// })
// .catch((errorMessage) => {
// alert(errorMessage || "Login failed. Please check email or password.")
// })

// }

// return(

// <div className="auth-page">
// <div className="login-container auth-card">

// <h2>Login</h2>

// <form onSubmit={handleSubmit} className="auth-form">

// <input
// type="email"
// placeholder="Email"
// onChange={(e)=>setEmail(e.target.value)}
// required
// />

// <input
// type="password"
// placeholder="Password"
// onChange={(e)=>setPassword(e.target.value)}
// required
// />

// <button type="submit" className="auth-btn">

// Login

// </button>

// <p className="auth-switch">
// Do not have an account? <Link to="/signup">Sign Up</Link>
// </p>

// </form>

// </div>
// </div>

// )

// }

// export default Login


import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { loginUser } from "../features/auth/authSlice"

import "../Css/Login.css"

const Login = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleSubmit=(e)=>{

e.preventDefault()

dispatch(loginUser({email,password}))
.unwrap()
.then(()=>{

setTimeout(()=>{

navigate("/products")

},1200)

})

}

return(

<div className="auth-page">

<div className="login-container auth-card">

<h2>Login</h2>

<form onSubmit={handleSubmit} className="auth-form">

<input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>

<input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>

<button type="submit" className="auth-btn">Login</button>

<p className="auth-switch">

Do not have an account? <Link to="/signup">Sign Up</Link>

</p>

</form>

</div>

</div>

)

}

export default Login;