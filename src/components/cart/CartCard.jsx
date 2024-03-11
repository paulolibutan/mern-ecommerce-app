import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { LoadingHourGlass } from "../common/LoadingSpinner";
import RemoveCartItem from "./RemoveCartItem";

export default function CartCard({ cart }) {
  CartCard.propTypes = {
    cart: PropTypes.object,
  };
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(cart.quantity);
  const [loading, setLoading] = useState(false);

  const plusToggle = () => {
    quantity < 1 ? 0 : setQuantity((prev) => prev + 1);
  };

  const minusToggle = () => {
    quantity <= 1 ? 0 : setQuantity((prev) => prev - 1);
  };

  const retrieveProductDetails = (productId) => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(true);
          setProduct(data.product);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    retrieveProductDetails(cart.productId);
  }, [cart.productId]);

  return loading ? (
    <LoadingHourGlass />
  ) : (
    <div>
      <div className="grid md:grid-cols-2 flex-row h-full w-full justify-center items-center gap-5 md:gap-10 px-5 md:px-20">
        <div className="flex flex-row justify-center lg:justify-end items-center w-full">
          <img
            className="object-cover h-full w-full max-w-sm lg:max-w-lg"
            src="https://freepngimg.com/save/10194-carrot-png/1000x901"
          />
        </div>
        <div className="flex flex-col gap-2 lg:gap-5 px-5 w-full md:max-w-[350px]">
          <div className="text-xl font-bold text-[#114232]">
            <span className="text-[#416D19]">Product Name: </span>
            {product.name}
          </div>
          <div className="text-xl font-bold text-[#114232]">
            <span className="text-[#416D19]">Unit Price: </span>${product.price}
          </div>
          <div className="text-xl font-bold text-[#114232]">
            <span className="text-[#416D19]">Subtotal: </span>
            {cart.subTotal}
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
          <div className="flex flex-col items-start lg:flex-row gap-2">
            <button className="bg-[#114232] text-white px-5 py-2 rounded-md hover:bg-[#87A922] w-full hover:scale-105">
              Checkout
            </button>
            <RemoveCartItem productId={(cart.productId)} />
          </div>
        </div>
      </div>
    </div>
  );
}
