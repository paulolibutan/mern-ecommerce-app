import { useCallback, useContext, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import AuthContext from "../../AuthContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { token } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState(0);

  const retrieveCart = useCallback(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(
          data.cart.cartItems.reduce((acc, cart) => acc + cart.quantity, 0)
        );
      });
  }, [token]);

  useEffect(() => {
    retrieveCart();
  }, [retrieveCart]);

  return (
    <div className="position-relative d-inline-block ms-3">
      <Link className="cart">
        <div>
          <Icon.Bag size={40} />
        </div>
      </Link>
      {cartItems === 0 ? (
        ""
      ) : (
        <span className="position-absolute top-50 start-50 bg-danger px-2 py-0 text-light rounded-circle">
          {cartItems}
        </span>
      )}
    </div>
  );
};

export default Cart;
