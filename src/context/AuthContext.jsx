import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();
import { LoadingFallingLines } from "../components/LoadingSpinner";

export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.node,
  };

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
    isAdmin: false,
  });

  const authenticateUser = (token) => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user !== "undefined") {
          setAuthState({
            isAuthenticated: true,
            user: data.user,
            token: token,
            isLoading: false,
            isAdmin: data.user.isAdmin,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
            isAdmin: false,
          });
        }
      });
  };

  const logout = () => {
    localStorage.clear();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
    });
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    authenticateUser(token);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      authenticateUser(storedToken);
    } else {
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {authState.isLoading ? <LoadingFallingLines /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
