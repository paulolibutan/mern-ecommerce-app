import { Navigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { useContext, useEffect } from "react";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" />;
};

export default Logout;
