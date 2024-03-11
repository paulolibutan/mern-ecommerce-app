import { useContext } from "react";
import CartCard from "../components/cart/CartCard";

import CartContext from "../context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  // return cart?.cartItems?.map((cart) => {
  //   cart?.cartItems.length < 1 ? (
  //     <div className="flex flex-row justify-center items-center py-10">
  //       <h1 className="text-2xl">Your cart is empty.</h1>
  //     </div>
  //   ) : (
  //     <CartCard key={cart.productId} cart={cart} />
  //   );
  // });

  return cart?.cartItems?.length !== 0 ? (
    cart?.cartItems?.map((cart) => {
      return <CartCard key={cart.productId} cart={cart} />;
    })
  ) : (
    <div className="flex flex-row justify-center items-center py-10">
      <h1 className="text-2xl">Your cart is empty.</h1>
    </div>
  );
}
