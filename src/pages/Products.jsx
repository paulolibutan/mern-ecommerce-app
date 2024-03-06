import { Container, Row } from "react-bootstrap";
import ProductCard from '../components/products/ProductCard'
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllActiveProducts = () => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  useEffect(() => {
    getAllActiveProducts();
  }, []);

  const productData = products.map((product) => {
    return <ProductCard products={product} key={product._id} />;
  });

  return (
    <Container fluid className="mt-5">
      <Row>{productData}</Row>
    </Container>
  );
};

export default Products;
