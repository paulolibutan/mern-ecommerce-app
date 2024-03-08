import { useEffect, useState } from "react";
import { Table, Col, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

const ProductAdminView = ({ productsData, getAllActiveProducts, message }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
            <ArchiveProduct
              productId={product._id}
              getAllActiveProducts={getAllActiveProducts}
              isActive={product.isActive}
            />
          </td>
        </tr>
      );
    });
    setProducts(productData);
  }, [getAllActiveProducts, message, productsData]);

  return (
    <Container>
      <Row>
        <Col className="text-end">
          <AddProduct getAllActiveProducts={getAllActiveProducts} />
        </Col>
      </Row>
      {message != "" ? (
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
          <tbody className="text-center">
            <tr>
              <td colSpan={5}>{message}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-container mt-3"
        >
          <thead>
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
      )}
    </Container>
  );
};

ProductAdminView.propTypes = {
  productsData: PropTypes.array,
  getAllActiveProducts: PropTypes.func,
  message: PropTypes.string,
};

export default ProductAdminView;
