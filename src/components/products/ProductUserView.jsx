import { Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import ProductCard from "./ProductCard";

const ProductUserView = ({ productsData, message }) => {
  const productData = productsData.map((product) => {
    return <ProductCard products={product} key={product._id} />;
  });

  return (
    <Container>
      <h4>Our Products</h4>
      <hr />
      {message !== "" ? (
        <Row>
          <Col>{message}</Col>
        </Row>
      ) : (
        <Row>{productData}</Row>
      )}
    </Container>
  );
};

ProductUserView.propTypes = {
  productsData: PropTypes.array,
  message: PropTypes.string,
};

export default ProductUserView;
