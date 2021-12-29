import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ReactLoading from "react-loading";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/passwordReset";
import SendPasswordResetEmail from "./pages/passwordReset/SendPasswordResetEmail";
import MyAccount from "./pages/MyAccount";
import Project from "./pages/Project";

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
    return (
      <div className="flex items-center justify-center mt-40">
        <ReactLoading type="bubbles" color="#1052fc" height={200} width={200} />
      </div>
    );
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

        {["/", "/projects"].map((path: string) => (
          <Route
            path={path}
            element={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            key={uuidv4()}
          />
        ))}
        <Route
          path="/my-account"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <PrivateRoute>
              <Project />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthenticationProvider>
);

export default Router;
