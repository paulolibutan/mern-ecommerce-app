import { useContext } from "react";
import Swal from "sweetalert2";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

export default function ClearCart() {
  const { token } = useContext(AuthContext);
  const { retrieveUserCart } = useContext(CartContext);

  const handleClearCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clearCart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Cart has been cleared successfully") {
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
        onClick={handleClearCart}
        className="bg-[#114232] text-white px-3 py-2 rounded-md hover:bg-[#87A922] w-full hover:scale-105"
      >
        Clear Cart
      </button>
    </>
  );
}
