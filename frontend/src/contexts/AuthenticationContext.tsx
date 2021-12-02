import { createContext, ReactNode, useEffect, useState } from "react";

export const authenticationContext = createContext({});

interface IAuthenticationProvider {
  children: ReactNode;
}

export const AuthenticationProvider = ({
  children
}: IAuthenticationProvider) => {
  const token = "aaaa";
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <authenticationContext.Provider value={{ isAuthenticated }}>
      {children}
    </authenticationContext.Provider>
  );
};
