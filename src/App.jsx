import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import About from "./pages/About";
import AppNavbar from "./components/AppNavbar";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import ProductsDetails from "./components/ProductDetails"
import Register from "./pages/Register";

const Layout = () => {
  return (
    <div>
      <AuthProvider>
        <Header />
        <AppNavbar />
        <Outlet />
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
          path: "/",
          element: <Home />,
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
      ],
    },
  ]);

  return (
    <div className="font-rubik">
      <RouterProvider router={routes} />
    </div>
  );
}
