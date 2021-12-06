import { SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { api } from "../services/api";
import { authenticationContext } from "../contexts/AuthenticationContext";
import ErrorBlock from "../components/ErrorBlock";

interface IUserData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { isAuthenticated } = useContext(authenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) return;

    await loginUser({ email, password });
  };

  const loginUser = async (userData: IUserData) => {
    try {
      const response = await api.post("/signin", userData);

      if (response.status === 200) {
        localStorage.setItem("rdxcms:user_info", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
      }
    } catch (err: any) {
      if (err.response) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Something went wrong");
      }
      setIsError(true);
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="min-h-full flex items-center justify-center my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-xl w-full p-5 space-y-8 ">
        <h1 className="h1">Login to RdxCMS</h1>
        {isError && (
          <ErrorBlock message={errorMessage} setIsError={setIsError} />
        )}
        <form onSubmit={onSubmitHandler}>
          <div>
            <div className="my-4">
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input"
                  required
                />
              </label>
            </div>
            <div className="my-4">
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input"
                  required
                />
              </label>
            </div>
            <button type="submit" className="btn w-full">
              Log in
            </button>
            <small className="flex mt-5 text-sm">
              Forgot your password?
              <Link
                to="/passwordReset/sendEmail"
                className="text-green hover:text-darkerGreen ml-2"
              >
                Reset password
              </Link>
            </small>
            <small className="flex mt-5 text-sm">
              Not registered?
              <Link
                to="/signup"
                className="text-green hover:text-darkerGreen ml-2"
              >
                Sign up
              </Link>
            </small>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
