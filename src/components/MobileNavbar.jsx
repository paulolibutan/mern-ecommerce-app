import PropTypes from "prop-types";
import { useContext } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

export default function MobileNavbar({ handleMobileNav }) {
  MobileNavbar.propTypes = {
    handleMobileNav: PropTypes.func,
  };
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <div>
      <div className="lg:hidden min-w-screen">
        <div className="flex flex-col gap-1 items-center justify-center py-3 bg-[#87A922] text-white min-w-screen">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                Home
              </Link>
              {isAdmin ? (
                <>
                  <Link
                    to="/products"
                    onClick={handleMobileNav}
                    className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
                  >
                    Manage Products
                  </Link>
                  <Link
                    to="/orders"
                    onClick={handleMobileNav}
                    className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
                  >
                    Manage Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/about-us"
                    onClick={handleMobileNav}
                    className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/products"
                    onClick={handleMobileNav}
                    className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
                  >
                    Products
                  </Link>
                  <Link
                    onClick={handleMobileNav}
                    className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
                  >
                    Favorites (0)
                  </Link>
                  <Link
                    onClick={handleMobileNav}
                    className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
                  >
                    Cart (0)
                  </Link>
                </>
              )}

              <Link
                to="/logout"
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                Home
              </Link>
              <Link
                to="/about-us"
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                About Us
              </Link>
              <Link
                to="products"
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                Products
              </Link>
              <Link
                to="/login"
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                Sign up
              </Link>
              <Link
                onClick={handleMobileNav}
                className="font-medium hover:font-semi-bold hover:scale-110 hover:underline underline-offset-4"
              >
                Cart (0)
              </Link>
            </>
          )}

          <div>
            <IoCloseCircleSharp
              size={30}
              onClick={handleMobileNav}
              className="hover:scale-125"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
