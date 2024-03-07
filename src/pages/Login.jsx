import { useContext, useEffect, useState } from "react";
import { Button, Container, Col, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AuthContext from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState("false");

  const navigate = useNavigate();

  const { login, isAuthenticated } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          login(data.accessToken);
          navigate("/");

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
      });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <Row className="flex flex-row justify-content-center">
        <Col sm={8} md={6}>
          <Container className="border p-5 mt-5">
            <Form onSubmit={(e) => handleLogin(e)}>
              <h3 className="mb-4">Log in to your account</h3>

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
                <Form.Text>
                  Need an account? Please click here to{" "}
                  <Link to="/register">sign up</Link>
                </Form.Text>
              </Form.Group>

              <Button variant="dark" type="submit" disabled={!isActive}>
                Log in
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
