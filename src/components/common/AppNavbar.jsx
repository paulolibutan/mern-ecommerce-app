import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AuthContext from "../../AuthContext";
import Cart from "../cart/Cart";

const AppNavbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`app-navbar ${
        scrolled ? "scrolled navbar navbar-light fixed-top" : "fixed-top"
      }`}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <div className="navbar-brand">
            <span className="material-symbols-outlined">toys</span>
            {import.meta.env.VITE_REACT_APP_BRAND}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!isAuthenticated ? (
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/login" className="navbar-link">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="navbar-link">
                Register
              </Nav.Link>
            </Nav>
          ) : (
            <>
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/products" className="navbar-link">
                  Products
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders" className="navbar-link">
                  Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" className="navbar-link">
                  Logout
                </Nav.Link>
              </Nav>
            </>
          )}
          <Cart />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
