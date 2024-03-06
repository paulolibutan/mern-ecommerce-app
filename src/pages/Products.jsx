import { useCallback, useContext, useEffect, useState } from "react";

import AuthContext from "../AuthContext";
import ProductAdminView from "../components/products/ProductAdminView";
import ProductUserView from "../components/products/ProductUserView";

const Products = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  const getAllActiveProducts = useCallback(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  useEffect(() => {
    getAllActiveProducts();
  }, [getAllActiveProducts]);

  return user.isAdmin ? (
    <ProductAdminView productsData={products} />
  ) : (
    <ProductUserView productsData={products} />
  );
};

export default Products;
