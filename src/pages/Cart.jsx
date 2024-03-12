import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import AuthContext from "../context/AuthContext";
import CartCard from "../components/cart/CartCard";
import CartContext from "../context/CartContext";
import CheckoutOrders from "../components/cart/CheckoutOrders";
import ClearCart from "../components/cart/ClearCart";
import { LoadingHourGlass } from "../components/common/LoadingSpinner";

export default function Cart() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const { cart, retrieveUserCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const cartCard =
    cart?.cartItems?.length !== 0 &&
    cart?.cartItems?.map((cart) => {
      return <CartCard key={cart.productId} cart={cart} />;
    });

  const empyCart = cart?.cartItems?.length === 0 && (
    <>
      <div className="flex flex-row justify-center items-center py-10">
        <h1 className="text-2xl">Your cart is empty.</h1>
      </div>
    </>
  );

  const showClearCart = cart?.cartItems?.length !== 0 && (
    <ClearCart retrieveUserCart={retrieveUserCart} />
  );

  const showCheckOutAll = cart?.cartItems?.length !== 0 && <CheckoutOrders />;

  console.log(cart);

  const totalQuantity = cart?.cartItems?.reduce(
    (acc, item) => item.quantity + acc,
    0
  );

  useEffect(() => {
    setLoading(true);
    retrieveUserCart();
    setLoading(false);
  }, [retrieveUserCart]);

  return loading ? (
    <LoadingHourGlass />
  ) : isAuthenticated && !isAdmin ? (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center py-10 px-5 gap-5 shadow-lg">
        <div className="text-xl font-bold">
          Total Items: <span className="text-[#007F73]">{totalQuantity}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div className="text-xl font-bold">
          Total Price:{" "}
          <span className="text-[#007F73]">
            <NumericFormat
              value={cart.totalPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
            />
          </span>
        </div>
        <div className="hidden md:block">|</div>
        <div className="w-full md:w-auto max-w-sm">{showClearCart}</div>
        <div className="w-full md:w-auto max-w-sm">{showCheckOutAll}</div>
      </div>
      <div>
        <div className="overflow-y-scroll h-[600px] border">
          {cartCard}
          {empyCart}
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
