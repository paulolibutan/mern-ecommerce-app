import { useCallback, useContext, useEffect, useState } from "react";

import AuthContext from "../AuthContext";
import ProductAdminView from "../components/products/ProductAdminView";
import ProductUserView from "../components/products/ProductUserView";

const Products = () => {
  const { isAdmin } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUrl = isAdmin
    ? `${import.meta.env.VITE_REACT_APP_API_URL}/products/all`
    : `${import.meta.env.VITE_REACT_APP_API_URL}/products/active`;

  const getAllActiveProducts = useCallback(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== undefined) {
          setMessage(data.message);
        } else if (data.error !== undefined) {
          setMessage(data.error);
        } else {
          setProducts(data.products);
          setMessage("");
        }
      });
  }, []);

  useEffect(() => {
    getAllActiveProducts();
  }, [getAllActiveProducts]);

  return isAdmin ? (
    <ProductAdminView
      productsData={products}
      message={message}
      getAllActiveProducts={getAllActiveProducts}
    />
  ) : (
    <ProductUserView productsData={products} message={message} />
  );
};

export default Products;
