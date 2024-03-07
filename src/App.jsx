import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddProduct from "./components/products/AddProduct";
import AppNavbar from "./components/common/AppNavbar";
import ArchiveProduct from "./components/products/ArchiveProduct";
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
        <Container className="my-5">
          <Routes>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/archiveProduct" element={<ArchiveProduct />} />
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
