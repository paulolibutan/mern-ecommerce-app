import { Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import ProductCard from "./ProductCard";


const ProductUserView = ({ productsData }) => {

  const productData = productsData.map((product) => {
    return <ProductCard products={product} key={product._id} />;
  });

  return (
    <Container fluid className="mt-5">
      <h4>Our Products</h4>
      <hr />
      <Row>{productData}</Row>
    </Container>
  );
};

ProductUserView.propTypes = {
  productsData: PropTypes.array,
};

export default ProductUserView;
