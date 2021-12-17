import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

interface IAuthenticationProvider {
  children: ReactNode;
}
interface IAuthenticationContextResponse {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const authenticationContext = createContext(
  {} as IAuthenticationContextResponse
);

export const AuthenticationProvider = ({
  children
}: IAuthenticationProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/currentSession", {
          withCredentials: true
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isLoading }),
    [isAuthenticated, isLoading]
  );

  return (
    <authenticationContext.Provider value={value}>
      {children}
    </authenticationContext.Provider>
  );
};
