import { useEffect, useState } from "react";
import { Table, Button, Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const ProductAdminView = ({ productsData, getAllActiveProducts, message }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (message !== "") {
      const productData = productsData.map((product) => {
        return (
          <tr key={product._id}>
            <td className="text-start">{product.name}</td>
            <td className="text-start">{product.description}</td>
            <td className="text-center">
              <NumericFormat
                value={product.price.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
            <td>
              {product.isActive ? (
                <span className="text-success">Available</span>
              ) : (
                <span className="text-danger">Not Available</span>
              )}
            </td>
            <td>
              <EditProduct
                productId={product._id}
                getAllActiveProducts={getAllActiveProducts}
              />
            </td>
            <td>
              <Button className="btn btn-dark btn-sm rounded-0 w-100">
                Disable
              </Button>
            </td>
          </tr>
        );
      });
      setProducts(productData);
    }
  }, [getAllActiveProducts, message, products.length, productsData]);

  return message !== "" ? (
    <Container>
      <Row>
        <Col className="text-end">
          <AddProduct getAllActiveProducts={getAllActiveProducts} />
        </Col>
      </Row>
      <h3>{message}</h3>
    </Container>
  ) : (
    <Container>
      <Row>
        <Col className="text-end">
          <AddProduct getAllActiveProducts={getAllActiveProducts} />
        </Col>
      </Row>
      <Table striped bordered hover className="mt-4" responsive>
        <thead className="text-center">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">{products}</tbody>
      </Table>
    </Container>
  );
};

ProductAdminView.propTypes = {
  productsData: PropTypes.array,
  getAllActiveProducts: PropTypes.func,
  message: PropTypes.string,
};

export default ProductAdminView;
