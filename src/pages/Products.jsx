import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingHourGlass } from "../components/common/LoadingSpinner";

import AuthContext from "../context/AuthContext";
import ProductCard from "../components/products/ProductCard";
import ProductDataTable from "../components/products/ProductDataTable";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useContext(AuthContext);

  const fetchUrl = isAdmin
    ? `${import.meta.env.VITE_REACT_APP_API_URL}/products/all`
    : `${import.meta.env.VITE_REACT_APP_API_URL}/products/active`;

  const retrieveProducts = useCallback(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, [fetchUrl]);

  useEffect(() => {
    retrieveProducts();
  }, [retrieveProducts]);

  return loading ? (
    <LoadingHourGlass />
  ) : isAdmin ? (
    <ProductDataTable
      products={products}
      key={products._id}
      retrieveProducts={retrieveProducts}
    />
  ) : (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-5 lg:gap-10 gap-5 mt-5">
      {products.map((product) => {
        return <ProductCard product={product} key={product._id} />;
      })}
    </div>
  );
}
