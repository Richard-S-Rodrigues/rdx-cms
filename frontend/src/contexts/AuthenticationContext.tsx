import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

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
  const userInfo = JSON.parse(localStorage.getItem("rdxcms:user_info") || "{}");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      setIsAuthenticated(false);
    }
    if (userInfo.token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
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
