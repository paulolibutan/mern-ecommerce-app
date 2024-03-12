import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import AuthContext from "../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  CartProvider.propTypes = {
    children: PropTypes.node,
  };
  const { token, isAuthenticated, isAdmin } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [cartContentCount, setCartContentCount] = useState(0);

  const count = !cart
    ? 0
    : cart?.cartItems?.reduce((acc, item) => item.quantity + acc, 0);

  const retrieveUserCart = useCallback(() => {
    isAuthenticated && !isAdmin
      ? fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.cart === undefined) {
              setCart([]);
            } else {
              setCart(data.cart);
            }
          })
      : setCart([]);
  }, [isAdmin, isAuthenticated, token]);

  useEffect(() => {
    retrieveUserCart();
    setCartContentCount(count);
  }, [count, retrieveUserCart]);

  return (
    <CartContext.Provider value={{ cart, cartContentCount, retrieveUserCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
