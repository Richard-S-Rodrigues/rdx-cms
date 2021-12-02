import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import ErrorBlock from "../components/ErrorBlock";

interface IUserData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) return;

    await loginUser({ email, password });
  };

  const loginUser = async (userData: IUserData) => {
    try {
      const response = await api.post("/signin", userData);
      console.log(response);
    } catch (err: any) {
      if (err.response) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Something went wrong");
      }
      setIsError(true);
    }
  };

  return (
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
