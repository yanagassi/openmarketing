import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import configs from "../configs";

const getUserData = (tkw) => {
  if (!tkw) {
    return {};
  }
  const decodedToken = jwtDecode(tkw);
  return decodedToken;
};

export const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
  const toe = localStorage.getItem(configs.TOKEN_JWT_PREFIX);
  const [isLoggedIn, setIsLoggedIn] = useState(toe && true);
  const [token, setToken] = useState(toe);
  const [user, setUser] = useState(getUserData(toe));

  const login = (newToken) => {
    localStorage.setItem(configs.TOKEN_JWT_PREFIX, newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    setUser(getUserData(newToken));
  };

  const logout = () => {
    localStorage.removeItem(configs.TOKEN_JWT_PREFIX);
    setToken(null);
    setIsLoggedIn(false);
    setUser({});
  };

  const apiContextValue = {
    isLoggedIn,
    token,
    login,
    logout,
    user,
  };

  return (
    <ApiContext.Provider value={apiContextValue}>
      {children}
    </ApiContext.Provider>
  );
};
