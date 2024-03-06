import { Button, Container, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../AuthContext";

const AddProduct = ({ ...props }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const { token } = useContext(AuthContext);

  const handleAddProduct = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.onHide();

      });
  };

  useEffect(() => {
    if (name !== "" && description !== "" && price !== 0) {
      setIsActive(true);
    }
  }, [description, name, price, props]);

  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                id="emnameail"
                placeholder="Enter product name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                type="text"
                id="description"
                placeholder="Enter product description"
                required
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="price">Price</Form.Label>
              <Form.Control
                type="number"
                id="price"
                placeholder="Enter product price"
                required
                autoComplete="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-light border border-black rounded-0"
          disabled={!isActive}
          onClick={(e) => handleAddProduct(e)}
        >
          Add
        </Button>
        <Button className="btn btn-dark rounded-0" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddProduct.propTypes = {
  onHide: PropTypes.func,
  getallactiveproducts: PropTypes.func,
};

export default AddProduct;
