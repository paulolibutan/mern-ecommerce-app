import { useCallback, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import AddToCart from "../cart/AddToCart";

const ProductDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState([]);

  const productDetails = useCallback(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
      });
  }, [productId]);

  useEffect(() => {
    productDetails();
  }, [productDetails]);

  return (
    <Container>
      <hr />
      <Row className="flex flex-row justify-content-center">
        <Col xs={12} md={7}>
          <Card className="d-none d-md-block">
            <img
              src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="img-fluid"
            />
          </Card>
          <Row>
            <Col xs={12} md={4} className="pt-3">
              <Card>
                <img
                  src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid"
                />
              </Card>
            </Col>
            <Col xs={12} md={4} className="pt-3">
              <Card>
                <img
                  src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid"
                />
              </Card>
            </Col>
            <Col xs={12} md={4} className="pt-3">
              <Card>
                <img
                  src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid"
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={5}>
          <Card className="p-5 h-100 justify-content-center mt-3 mt-md-0">
            <h1>{product.name}</h1>
            <h3 className="mt-3">
              <NumericFormat
                value={product.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </h3>
            <h4 className="mt-2">{product.description}</h4>
            <AddToCart productId={productId} />
          </Card>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default ProductDetails;
