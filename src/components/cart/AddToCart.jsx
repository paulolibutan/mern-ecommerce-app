import { useContext, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import AuthContext from "../../AuthContext";

const AddToCart = ({ productId }) => {
  const [quantity, setQuantity] = useState(0);

  const { token, isAdmin } = useContext(AuthContext);

  const handleAddToCart = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/cart/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity: parseInt(quantity),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product has been added to the cart") {
          console.log(data);
          Swal.fire({
            title: "Success!",
            text: data.message,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else if (data.error !== "" || data.error != undefined) {
          Swal.fire({
            title: "Error!",
            text: data.error,
            icon: "error",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
        setQuantity(0);
      });
  };

  return isAdmin ? (
    <Navigate to="/products" />
  ) : (
    <Form onSubmit={(e) => handleAddToCart(e)}>
      <Row>
        <Col xs={12} md={6}>
          <InputGroup>
            <InputGroup.Text className="rounded-0" htmlFor="quantity">
              Quantity
            </InputGroup.Text>
            <Form.Control
              type="number"
              id="quantity"
              className="rounded-0"
              required
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6}>
          <Button className="btn btn-dark rounded-0 w-100" type="submit">
            Add to cart
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

AddToCart.propTypes = {
  quantity: PropTypes.number,
  productId: PropTypes.string,
};

export default AddToCart;
