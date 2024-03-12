import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import OrdersDataTable from "../components/orders/OrdersDataTable";
import { Navigate } from "react-router-dom";

import { LoadingHourGlass } from "../components/common/LoadingSpinner";

export default function Orders() {
  const { token, isAdmin, isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUrl = isAdmin
    ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`
    : `${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`;

  const retrieveAllOrders = useCallback(() => {
    setLoading(true);
    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.orders === undefined) {
          setOrders([]);
        } else {
          setOrders(data.orders);
        }
        setLoading(false);
      });
  }, [fetchUrl, token]);

  useEffect(() => {
    retrieveAllOrders();
  }, [retrieveAllOrders]);

  return loading ? (
    <LoadingHourGlass />
  ) : isAuthenticated ? (
    <OrdersDataTable orders={orders} key={orders._id} />
  ) : (
    <Navigate to="/login" />
  );
}
