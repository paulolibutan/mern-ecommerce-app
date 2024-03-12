import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import OrdersDataTable from "../components/orders/OrdersDataTable";
import { Navigate } from "react-router-dom";

export default function Orders() {
  const { token, isAdmin } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const retrieveAllOrders = useCallback(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      });
  }, [token]);

  useEffect(() => {
    retrieveAllOrders();
  }, [retrieveAllOrders]);

  return isAdmin ? (
    <OrdersDataTable orders={orders} key={orders._id} />
  ) : (
    <Navigate to="/" />
  );
}
