import { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AuthContext from "../../AuthContext";

const AppNavbar = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-transparent">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h3>Ecommerce Demo</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!isAuthenticated ? (
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/products">
                Products
              </Nav.Link>
              <NavDropdown
                title={user ? `${user.firstName}` : ""}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
