import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import About from "./pages/About";
import AppNavbar from "./components/common/AppNavbar";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Header from "./components/common/Header";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import ProductsDetails from "./components/products/ProductDetails";
import Register from "./pages/Register";

const Layout = () => {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <Header />
          <AppNavbar />
          <Outlet />
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/",
          element: <Products />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productId",
          element: <ProductsDetails />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "*",
          element: <Products />,
        },
      ],
    },
  ]);

  return (
    <div className="font-rubik">
      <RouterProvider router={routes} />
    </div>
  );
}
