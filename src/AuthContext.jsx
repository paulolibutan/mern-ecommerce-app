import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  AuthProvider.propTypes = {
    children: PropTypes.node,
  };

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
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
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
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
