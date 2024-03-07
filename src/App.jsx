import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddProduct from "./components/products/AddProduct";
import AppNavbar from "./components/common/AppNavbar";
import { AuthProvider } from "./AuthContext";
import EditProduct from "./components/products/EditProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/editProduct" element={<EditProduct />} />
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
