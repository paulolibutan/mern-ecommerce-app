import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppNavbar from "./components/common/AppNavbar";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import Register from "./pages/Register";
import ProductDetails from "./components/products/ProductDetails";

function App() {
  return (
    <div className="app-container mt-5">
      <AuthProvider>
        <BrowserRouter>
          <AppNavbar />
          <Container className="my-5">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
