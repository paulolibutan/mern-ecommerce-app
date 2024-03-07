import PropTypes from "prop-types";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

import AuthContext from "../../AuthContext";

const ArchiveProduct = ({ productId, getAllActiveProducts, isActive }) => {
  const { token } = useContext(AuthContext);

  const handleProductArchive = (productId) => {
    fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products/archive/${productId}`,
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
        getAllActiveProducts();
      });
  };

  const handleProductActivation = (productId) => {
    fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/products/activate/${productId}`,
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
        getAllActiveProducts();
      });
  };

  return isActive ? (
    <Button
      className="btn btn-dark btn-sm rounded-0 w-100"
      onClick={() => handleProductArchive(productId)}
    >
      Archive
    </Button>
  ) : (
    <Button
      className="btn btn-dark btn-sm rounded-0 w-100"
      onClick={() => handleProductActivation(productId)}
    >
      Activate
    </Button>
  );
};

ArchiveProduct.propTypes = {
  productId: PropTypes.string,
  getAllActiveProducts: PropTypes.func,
  isActive: PropTypes.bool,
};

export default ArchiveProduct;
