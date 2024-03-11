import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AuthContext from "../context/AuthContext";

export default function Register() {
  const formInititalValue = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(formInititalValue);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Confirm password did not match",
        icon: "error",
        confirmButtonText: "Close",
      });
    } else {
      fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          mobileNo: formData.mobileNumber,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (
            data.message ===
            "User has been registered successfully. Please check your email for confirmation."
          ) {
            navigate("/login");

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
        });
      setFormData(formInititalValue);
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex flex-row justify-center items-center min-w-full min-h-full md:mt-10">
      <div className="border shadow-2xl m-10 border-t-4 border-t-[#87A922] sm:w-[500px] rounded-md">
        <div className="p-10 sm:p-16">
          <div className="py-5">
            <h1 className="text-2xl text-[#114232] font-bold">
              Sign up for a new account
            </h1>
          </div>
          <form onSubmit={(e) => handleRegister(e)}>
            <div className="flex flex-col py-2">
              <label
                htmlFor="firstName"
                className="text-lg font-bold text-[#87A922]"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormInputChange}
                className="border-b focus:outline-none py-2 focus:py-3"
                placeholder="Enter your first name"
                autoComplete="firstName"
                required
              />
            </div>

            <div className="flex flex-col py-2">
              <label
                htmlFor="lastName"
                className="text-lg font-bold text-[#87A922]"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormInputChange}
                className="border-b focus:outline-none py-2 focus:py-3"
                placeholder="Enter your last name"
                autoComplete="lastName"
                required
              />
            </div>

            <div className="flex flex-col py-2">
              <label
                htmlFor="email"
                className="text-lg font-bold text-[#87A922]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormInputChange}
                className="border-b focus:outline-none py-2 focus:py-3"
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </div>

            <div className="flex flex-col py-2">
              <label
                htmlFor="mobileNumber"
                className="text-lg font-bold text-[#87A922]"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleFormInputChange}
                className="border-b focus:outline-none py-2 focus:py-3"
                placeholder="Enter your mobile number"
                autoComplete="mobileNumber"
                required
              />
            </div>

            <div className="flex flex-col py-2">
              <label
                htmlFor="password"
                className="text-lg font-bold text-[#87A922]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormInputChange}
                className="border-b focus:outline-none py-2 focus:py-3"
                placeholder="Enter your password"
                autoComplete="password"
                required
              />
            </div>

            <div className="flex flex-col py-2">
              <label
                htmlFor="confirmPassword"
                className="text-lg font-bold text-[#87A922]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormInputChange}
                className="border-b focus:outline-none py-2 focus:py-3"
                placeholder="Confirm your password"
                autoComplete="confirmPassword"
                required
              />
            </div>

            <div className="py-5">
              <button
                type="submit"
                className="bg-[#87A922] hover:bg-[#114232] w-full p-3 text-white text-lg font-medium border border-[#87A922] hover:border-[#114232] rounded-full hover:font-bold"
              >
                Sign
              </button>
            </div>
          </form>
          <div className="text-[#114232] text-base sm:flex flex-row">
            <p>Already have an account?</p>
            <Link
              className="sm:ms-1 underline underline-offset-4 font-semibold hover:font-bold"
              to={"/login"}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
