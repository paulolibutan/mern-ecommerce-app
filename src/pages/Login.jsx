import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AuthContext from "../context/AuthContext";

export default function Login() {
  const formInitialValues = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(formInitialValues);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          login(data.accessToken);
          navigate(
            location?.state?.prevUrl ? location?.state?.prevUrl : "/login"
          );

          Swal.fire({
            title: "Success!",
            text: "You are now logged in",
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
        navigate(
          location?.state?.prevUrl ? location?.state?.prevUrl : "/login"
        );
      });
  };

  return isAuthenticated ? (
    <Navigate
      to={location?.state?.prevUrl ? location?.state?.prevUrl : "/"}
    />
  ) : (
    <div className="flex flex-row justify-center items-center min-w-full min-h-full md:mt-10">
      <div className="border shadow-2xl m-10 border-t-4 border-t-[#87A922] sm:w-[500px] rounded-md">
        <div className="p-10 sm:p-16">
          <div className="py-5">
            <h1 className="text-2xl text-[#114232] font-bold">
              Log in to your account
            </h1>
          </div>
          <form onSubmit={(e) => handleLogin(e)}>
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
                autoComplete="email"
                required
              />
            </div>
            <div className="py-5">
              <button
                type="submit"
                className="bg-[#87A922] hover:bg-[#114232] w-full p-3 text-white text-lg font-medium border border-[#87A922] hover:border-[#114232] rounded-full hover:font-bold"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="text-[#114232] text-base sm:flex flex-row">
            <p>Don&apos;t have an account?</p>
            <Link
              className="sm:ms-1 underline underline-offset-4 font-semibold hover:font-bold"
              to={"/register"}
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
