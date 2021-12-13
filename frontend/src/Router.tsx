import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/passwordReset";
import SendPasswordResetEmail from "./pages/passwordReset/SendPasswordResetEmail";

import {
  authenticationContext,
  AuthenticationProvider
} from "./contexts/AuthenticationContext";

interface IPrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useContext(authenticationContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const Router = () => (
  <AuthenticationProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route
          path="/passwordReset/sendEmail"
          element={<SendPasswordResetEmail />}
        />

        <Route
          path="/"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthenticationProvider>
);

export default Router;
