import { useEffect, useState } from "react";
import { Table, Button, Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

import AddProduct from "./AddProduct";

const ProductAdminView = ({ productsData }) => {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    const productData = productsData.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>
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
            <Button className="btn btn-dark btn-sm rounded-0 w-100">
              Update
            </Button>
          </td>
          <td>
            <Button className="btn btn-light btn-sm border border border-black rounded-0 w-100">
              Disable
            </Button>
          </td>
        </tr>
      );
    });

    setProducts(productData);
  }, [productsData]);

  return (
    <Container>
      <AddProduct
        show={showAddProductModal}
        onHide={() => setShowAddProductModal(false)}
      />

      <Row>
        <Col className="text-end">
          <Button
            className="btn btn-dark rounded-0 mt-5"
            onClick={() => setShowAddProductModal(true)}
          >
            Add Product
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover className="mt-4">
        <thead className="text-center bg-black">
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
};

export default ProductAdminView;
