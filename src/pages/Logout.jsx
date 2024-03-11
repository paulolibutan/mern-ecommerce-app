import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";

export default function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" />;
}
