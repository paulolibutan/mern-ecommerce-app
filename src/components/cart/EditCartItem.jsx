import PropTypes from "prop-types";
import { useContext } from "react";
import Swal from "sweetalert2";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

export default function EditCartItem({ productId, quantity, enableCheckout }) {
  EditCartItem.propTypes = {
    productId: PropTypes.string,
    quantity: PropTypes.number,
    enableCheckout: PropTypes.func,
  };
  const { token } = useContext(AuthContext);
  const { retrieveUserCart } = useContext(CartContext);

  const handleEditCartItem = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/cart/updateQuantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity: parseInt(quantity),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Cart has been updated successfully") {
          Swal.fire({
            title: "Success!",
            text: data.message,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else if (data.error !== "") {
          Swal.fire({
            title: "Error!",
            text: data.error,
            icon: "error",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
        retrieveUserCart();
        enableCheckout();
      });
  };

  return (
    <>
      <button
        onClick={handleEditCartItem}
        className="bg-[#114232] text-white px-5 py-2 rounded-md hover:bg-[#87A922] w-full hover:scale-105"
      >
        Update
      </button>
    </>
  );
}
