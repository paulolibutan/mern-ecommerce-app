import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import AuthContext from "../../AuthContext";
import ProductModal from "./ProductModal";

const AddProduct = ({ getAllActiveProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const { token } = useContext(AuthContext);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setName("");
    setDescription("");
    setPrice("");
    setShowModal(false);
  };

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
        if (data.message === "Product has been created successfully") {
          Swal.fire({
            title: "Success!",
            text: data.message,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else if (data.error !== "") {
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
        getAllActiveProducts();
        closeModal();
        setName("");
        setDescription("");
        setPrice("");
      });
  };

  return (
    <>
      <Button className="btn btn-dark rounded-0 mt-5" onClick={openModal}>
        Add Product
      </Button>

      <ProductModal
        title={"Add New Product"}
        showModal={showModal}
        closeModal={closeModal}
      >
        <Form onSubmit={(e) => handleAddProduct(e)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
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
          <Modal.Footer>
            <Button
              className="btn btn-light border border-black rounded-0"
              type="submit"
            >
              Submit
            </Button>
            <Button className="btn btn-dark rounded-0" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </ProductModal>
    </>
  );
};

AddProduct.propTypes = {
  getAllActiveProducts: PropTypes.func,
};

export default AddProduct;
