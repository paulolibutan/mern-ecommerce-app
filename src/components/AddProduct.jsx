import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

import AuthContext from "../context/AuthContext";

export default function AddProduct({ retrieveProducts }) {
  AddProduct.propTypes = {
    retrieveProducts: PropTypes.func,
  };
  const { token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const formInitialValues = {
    name: "",
    price: "",
    description: "",
  };
  const [formData, setFormData] = useState(formInitialValues);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(formInitialValues);
  }

  const handleAddProduct = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: formData.price,
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
        setFormData(formInitialValues);
        setShowModal(false);
        retrieveProducts();
      });
  };
  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#87A922] hover:bg-[#114232] hover:font-medium px-3 py-2 rounded-md text-sm text-white"
      >
        Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black bg-opacity-25">
          <div className="w-[600px]">
            <div className="bg-white p-10 rounded-lg">
              <div className="flex justify-end">
                <IoClose
                  size={30}
                  onClick={closeModal}
                  className="hover:scale-125 text-[#114232]"
                />
              </div>
              <div>
                <div className="pb-5">
                  <h1 className="text-2xl text-[#114232] font-bold">
                    Add Product
                  </h1>
                </div>
                <form onSubmit={(e) => handleAddProduct(e)}>
                  <div className="flex flex-col py-2">
                    <label
                      htmlFor="name"
                      className="text-lg font-bold text-[#87A922]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormInputChange}
                      className="border rounded-lg mt-2 p-2 focus:outline-none py-2 focus:py-3 text-sm"
                      placeholder="Enter product name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="flex flex-col py-2">
                    <label
                      htmlFor="description"
                      className="text-lg font-bold text-[#87A922]"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormInputChange}
                      className="border rounded-lg mt-2 p-2 focus:outline-none py-2 focus:py-3 text-sm"
                      placeholder="Enter product description"
                      autoComplete="description"
                      required
                    />
                  </div>

                  <div className="flex flex-col py-2">
                    <label
                      htmlFor="price"
                      className="text-lg font-bold text-[#87A922]"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleFormInputChange}
                      className="border rounded-lg mt-2 p-2 focus:outline-none py-2 focus:py-3 text-sm"
                      placeholder="Enter product price"
                      autoComplete="price"
                      required
                    />
                  </div>

                  <div className="py-5">
                    <button
                      type="submit"
                      className="bg-[#87A922] hover:bg-[#114232] py-1 px-3 text-white text-sm font-medium border border-[#87A922] hover:border-[#114232] rounded-lg hover:font-bold"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
