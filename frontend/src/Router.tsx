import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/passwordReset";
import SendPasswordResetEmail from "./pages/passwordReset/SendPasswordResetEmail";

import {
  authenticationContext,
  AuthenticationProvider
} from "./contexts/AuthenticationContext";

const Router = () => {
  const { isAuthenticated } = useContext(authenticationContext);

  return (
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

          <Route path="/" element={isAuthenticated ? <Home /> : <SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};

export default Router;
