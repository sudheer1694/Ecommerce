// import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Navbar from "./Components/Navbar";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Cart from "./pages/Cart";
// import Wishlist from "./pages/Wishlist";

// function AppRoutes() {
//   const location = useLocation();
//   const user = useSelector((state) => state.auth.user);
//   const hideNavbar =
//     location.pathname === "/signup" ||
//     location.pathname === "/login" ||
//     location.pathname === "/products";

//   return (
//     <>
//       {!hideNavbar && <Navbar />}

//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" replace />} />
//         <Route
//           path="/products"
//           element={user ? <Home /> : <Navigate to="/login" replace />}
//         />

//         <Route
//           path="/login"
//           element={user ? <Navigate to="/products" replace /> : <Login />}
//         />

//         <Route
//           path="/signup"
//           element={user ? <Navigate to="/products" replace /> : <Signup />}
//         />

//         <Route path="/cart" element={<Cart />} />

//         <Route path="/wishlist" element={<Wishlist />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Navbar from "./Components/Navbar";
import PopupDialog from "./Components/PopupDialog";
import { clearMessage } from "./features/auth/authSlice";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function AppRoutes() {

  const location = useLocation()
  const dispatch = useDispatch()

  const { user, success, error } = useSelector((state) => state.auth)

  const hideNavbar =
    location.pathname === "/signup" ||
    location.pathname === "/login"

  useEffect(() => {
    if (!success && !error) return

    const timer = setTimeout(() => {
      dispatch(clearMessage())
    }, 2200)

    return () => clearTimeout(timer)
  }, [success, error, dispatch])

  return (
    <>

      {!hideNavbar && <Navbar />}

      {success && <PopupDialog message={success} type="success" />}
      {error && <PopupDialog message={error} type="error" />}

      <Routes>

        <Route path="/" element={<Navigate to="/signup" />} />

        <Route
          path="/products"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/products" />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/products" />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
