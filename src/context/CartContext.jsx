import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import AuthContext from "../context/AuthContext";
import { LoadingFallingLines } from "../components/common/LoadingSpinner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  CartProvider.propTypes = {
    children: PropTypes.node,
  };
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const retrieveUserCart = useCallback(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data.cart);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    retrieveUserCart();
  }, [retrieveUserCart]);

  return (
    <CartContext.Provider value={cart}>
      {loading ? <LoadingFallingLines /> : children}
    </CartContext.Provider>
  );
};

export default CartContext;
