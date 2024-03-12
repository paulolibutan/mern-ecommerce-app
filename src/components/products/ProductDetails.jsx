import { useContext, useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import { LoadingHourGlass } from "../common/LoadingSpinner";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { token, isAuthenticated, isAdmin } = useContext(AuthContext);
  const { retrieveUserCart } = useContext(CartContext);

  const plusToggle = () => {
    quantity < 1 ? 0 : setQuantity((prev) => prev + 1);
  };

  const minusToggle = () => {
    quantity <= 1 ? 0 : setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = (e, productId) => {
    isAuthenticated
      ? addToCart(e, productId)
      : navigate("/login", { state: { prevUrl: location.pathname } });
  };

  const addToCart = (e, productId) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/cart/addToCart`, {
      method: "POST",
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
        if (data.message === "Product has been added to the cart") {
          Swal.fire({
            title: "Success!",
            text: data.message,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else if (data.error !== "" || data.error != undefined) {
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
        setQuantity(1);
        retrieveUserCart();
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      });
  }, [productId]);

  return loading ? (
    <LoadingHourGlass />
  ) : isAdmin ? (
    <Navigate to="/products" />
  ) : (
    <div className="grid md:grid-cols-2 flex-row h-full w-full justify-center items-center gap-5 md:gap-10 px-5 py-10 md:p-20">
      <div className="flex flex-row justify-center lg:justify-end items-center w-full">
        <img
          className="object-cover h-full w-full max-w-lg"
          src="https://freepngimg.com/save/10194-carrot-png/1000x901"
        />
      </div>
      <div className="flex flex-col gap-5 px-5 w-full md:max-w-[350px]">
        <div className="text-3xl font-bold text-[#114232]">{product.name}</div>
        <div className="text-lg font-semibold">{product.description}</div>
        <div className="text-3xl font-medium text-[#87A922]">
          <NumericFormat
            value={product.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        </div>
        <div className="flex flex-row">
          <button
            type="button"
            onClick={minusToggle}
            className="bg-[#114232] text-white px-5 py-2 hover:bg-[#87A922] rounded-s-md "
          >
            -
          </button>
          <input
            type="text"
            disabled
            minLength={0}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-2 px-3 py-2 focus:outline-none text-md font-semibold text-center w-full"
          />
          <button
            type="button"
            onClick={plusToggle}
            className="bg-[#114232] text-white px-5 py-2 hover:bg-[#87A922] rounded-e-md"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-start lg:flex-row gap-4">
          <button
            onClick={(e) => handleAddToCart(e, productId)}
            className="bg-[#114232] text-white px-5 py-2 rounded-md hover:bg-[#87A922] w-full hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
