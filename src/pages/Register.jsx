import { useContext, useEffect, useState } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import AuthContext from "../AuthContext";

const Register = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState("false");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
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
          firstName,
          lastName,
          email,
          password,
          mobileNo,
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
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNo("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [confirmPassword, email, firstName, lastName, mobileNo, password]);

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <Row className="flex flex-row justify-content-center">
        <Col sm={8} md={6}>
          <Container className="border p-5 mt-5 pt-5">
            <Form onSubmit={(e) => handleRegister(e)}>
              <h3 className="mb-4">Sign up for a new account</h3>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  required
                  autoComplete="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  required
                  autoComplete="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="mobileNo">Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  id="mobileNo"
                  placeholder="Enter your mobile number"
                  required
                  autoComplete="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="confirmPassword">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  autoComplete="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Text>
                  Already signed up? Please click here to{" "}
                  <Link to="/login">log in</Link>
                </Form.Text>
              </Form.Group>

              <Button variant="dark" type="submit" className="rounded-0" disabled={!isActive}>
                Sign up
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
