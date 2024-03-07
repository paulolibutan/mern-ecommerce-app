import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AuthContext from "../../AuthContext";

const AppNavbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
      <Navbar expand="lg" className="bg-transparent py-2 min-vw-100 fixed-top">
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
                {" "}
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default AppNavbar;
