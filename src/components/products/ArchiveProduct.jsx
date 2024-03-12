import PropTypes from "prop-types";
import { useContext } from "react";
import Swal from "sweetalert2";

import AuthContext from "../../context/AuthContext";

export default function ArchiveProduct({ product, retrieveProducts }) {
  ArchiveProduct.propTypes = {
    product: PropTypes.object,
    retrieveProducts: PropTypes.func,
  };
  const { token } = useContext(AuthContext);

  const handleProductArchive = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/archive/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product has been archived successfully") {
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
        retrieveProducts();
      });
  };

  const handleProductActivation = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/activate/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product has been activated successfully") {
          Swal.fire({
            title: "Success!",
            text: data.message,
            icon: "success",
            timer: 2000,
            confirmButtonText: "Close",
          });
        } else if (data.error !== "") {
          Swal.fire({
            title: "Error!",
            text: data.error,
            icon: "error",
            timer: 2000,
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong",
            icon: "error",
            timer: 2000,
            confirmButtonText: "Close",
          });
        }
        retrieveProducts();
      });
  };

  return (
    <div>
      {product.isActive ? (
        <button
          onClick={() => handleProductArchive(product._id)}
          type="button"
          className="bg-[#FCDC2A] rounded-md py-2 px-3 text-[#E1EE1] me-2 hover:scale-110 hover:font-medium"
        >
          Archive
        </button>
      ) : (
        <button
          onClick={() => handleProductActivation(product._id)}
          type="button"
          className="bg-[#87A922] text-white rounded-md py-2 px-3 text-[#E1EE1] me-2 hover:scale-110 hover:font-medium"
        >
          Activate
        </button>
      )}
    </div>
  );
}
