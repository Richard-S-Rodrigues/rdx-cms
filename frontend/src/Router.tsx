import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/passwordReset";
import SendPasswordResetEmail from "./pages/passwordReset/SendPasswordResetEmail";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/passwordReset" element={<PasswordReset />} />
      <Route
        path="/passwordReset/sendEmail"
        element={<SendPasswordResetEmail />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
