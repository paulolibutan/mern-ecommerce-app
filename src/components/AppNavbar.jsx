import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function AppNavbar() {
  const { isAdmin, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-[#87A922] sticky top-24 z-10 hidden lg:block shadow-2xl">
      <ul className="flex flex-row justify-center item-center text-base text-white">
        {!isAdmin && (
          <>
            <Link
              to="/"
              className="p-3 text-white hover:bg-[#114232] hover:font-semibold"
            >
              Home
            </Link>
            <Link
              to="/products"
              className=" p-3 text-white hover:bg-[#114232] hover:font-semibold"
            >
              Shop Now
            </Link>
            <Link
              to="/about-us"
              className=" p-3 text-white hover:bg-[#114232] hover:font-semibold"
            >
              About Us
            </Link>
          </>
        )}
        {isAuthenticated && isAdmin && (
          <>
            <Link
              to="/products"
              className=" p-3 text-white hover:bg-[#114232] hover:font-semibold"
            >
              Manage Products
            </Link>
            <Link
              to="/orders"
              className=" p-3 text-white hover:bg-[#114232] hover:font-semibold"
            >
              Manage Orders
            </Link>
            <Link
              to="/logout"
              className=" p-3 text-white hover:bg-[#114232] hover:font-semibold"
            >
              Logout
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
