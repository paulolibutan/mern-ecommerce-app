import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHeart } from "react-icons/go";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

import Announcement from "./Announcement";
import AuthContext from "../../context/AuthContext";
import BrandLogo from "../../assets/brand-logo.svg?react";
import CartContext from "../../context/CartContext";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  const [showMobileNav, setshowMobileNav] = useState(false);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const { cartContentCount } = useContext(CartContext);

  const handleMobileNav = () => {
    setshowMobileNav(!showMobileNav);
  };

  return (
    <>
      {!isAdmin && <Announcement />}
      <div className="sticky top-0 z-50 flex flex-col items-center min-w-full bg-[#F3F3F3] lg:py-1">
        <div className="flex flex-row justify-between lg:gap-20 items-center p-5">
          <div className="flex flex-col sm:flex-row items-center sm:gap-5 lg:gap-0">
            <Link to="/">
              <BrandLogo className=" ease-n-out delay-150 hover:-translate-x-5 hover:scale-110 hover: duration-300" />
            </Link>
            <GiHamburgerMenu
              onClick={handleMobileNav}
              size={25}
              className="lg:hidden text-[#87A922] hover:scale-125 hover:text-[#87A92287A922]"
            />
          </div>
          {!isAdmin && (
            <>
              <form>
                <div className="lg:flex lg:flex-row justify-center items-center hidden rounded-full">
                  <div>
                    <input
                      type="text"
                      className="border py-2 px-5 rounded-s-full focus:outline-none w-full"
                      placeholder="Search for products..."
                    />
                  </div>
                  <div>
                    <button className="bg-[#87A922] hover:bg-[#114232] hover:font-semibold py-2 px-5 rounded-e-full text-base text-white">
                      Search
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <div className="lg:flex lg:flex-row hidden items-center gap-5 lg:mx-5 font-semibold text-[#114232]">
                  {isAuthenticated ? (
                    <>
                      <GoHeart size={45} className="hover:scale-110" />
                      <Link to="/cart" className="relative">
                        <LiaShoppingBagSolid
                          size={50}
                          className="hover:scale-110 relative"
                        />
                        {cartContentCount?.length < 1 ||
                        cartContentCount === undefined ? (
                          <span className="absolute top-7 right-1 text-white bg-[#87A922] rounded-full px-2.5 py-1 text-sm">
                            0
                          </span>
                        ) : (
                          <span className="absolute top-7 right-1 text-white bg-[#87A922] rounded-full px-2.5 py-1 text-sm">
                            {cartContentCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/logout"
                        className="hover:scale-110 hover:underline hover:underline-offset-4"
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="hover:scale-110 hover:underline hover:underline-offset-4"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="hover:scale-110 hover:underline hover:underline-offset-4"
                      >
                        Sign up
                      </Link>
                      <Link to="/cart" className="relative hover:scale-110">
                        <LiaShoppingBagSolid
                          size={50}
                          className="hover:scale-110 relative"
                        />
                        {cartContentCount?.length < 1 ||
                        cartContentCount === undefined ? (
                          <span className="absolute top-7 right-1 text-white bg-[#87A922] rounded-full px-2.5 py-1 text-sm">
                            0
                          </span>
                        ) : (
                          <span className="absolute top-7 right-1 text-white bg-[#87A922] rounded-full px-2.5 py-1 text-sm">
                            {cartContentCount}
                          </span>
                        )}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="sticky top-28 sm:top-20 z-50">
        {showMobileNav && <MobileNavbar handleMobileNav={handleMobileNav} />}
      </div>
    </>
  );
}
