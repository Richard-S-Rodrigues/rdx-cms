import { SyntheticEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../services/api";

import ErrorBlock from "../../components/ErrorBlock";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { search } = useLocation();
  const [, token, id] = search.replace("&id", "").split("=");

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!newPassword.trim() || !confirmNewPassword.trim()) return;

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords are different");
      setIsError(true);
      return;
    }

    await changePassword(id, token, newPassword);
  };

  const changePassword = async (
    userId: string,
    passwordResetToken: string,
    password: string
  ) => {
    try {
      if (!passwordResetToken.trim()) {
        throw new Error("Token not provided!");
      }

      await api.post("/passwordReset", {
        userId,
        token: passwordResetToken,
        password
      });
      setIsPasswordChanged(true);
    } catch (err: any) {
      if (err.response) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage(err.message);
      }

      setIsError(true);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full p-4 space-y-8 block">
        {!isPasswordChanged ? (
          <>
            <h1 className="h1">Add a new password</h1>
            {isError && (
              <ErrorBlock message={errorMessage} setIsError={setIsError} />
            )}
            <form onSubmit={onSubmitHandler} className="block">
              <label htmlFor="newPassword">
                New password:
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="input"
                  required
                />
              </label>
              <label htmlFor="confirmNewPassword" className="block my-4">
                Confirm new password:
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(event) => {
                    setConfirmNewPassword(event.target.value);
                  }}
                  className="input"
                  required
                />
              </label>
              <button type="submit" className="btn w-full">
                Change Password
              </button>
            </form>
          </>
        ) : (
          <div>
            <h1 className="h1 text-left">
              You password has been changed successfully!
            </h1>
            <Link
              to="/signin"
              className="text-green hover:text-darkerGreen block mt-3"
            >
              Go back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
