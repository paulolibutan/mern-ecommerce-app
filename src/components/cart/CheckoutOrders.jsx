import { useContext } from "react";
import Swal from "sweetalert2";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

export default function CheckoutOrders() {
  const { retrieveUserCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  const handleCheckout = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Order has been checked out successfully") {
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
      });
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        className="bg-[#114232] text-white px-3 py-2 rounded-md hover:bg-[#87A922] w-full hover:scale-105"
      >
        Checkout
      </button>
    </>
  );
}
