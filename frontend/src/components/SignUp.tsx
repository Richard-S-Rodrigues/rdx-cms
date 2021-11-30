import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import ErrorBlock from "./ErrorBlock";

interface IUserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return;
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    };

    await createUser(data);
  };

  const createUser = async (userData: IUserData) => {
    try {
      const response = await api.post("/signout", userData);
      console.log(response);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data.error);
        setErrorMessage(err.response.data.error);
      } else {
        console.log("error", err.message);
        setErrorMessage("Something went wrong!");
      }
      setIsError(true);
    }
  };
  return (
    <div className="min-h-full flex items-center justify-center my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-xl w-full p-5 space-y-8 ">
        <h1 className="h1">Sign up for RdxCMS</h1>
        {isError && (
          <ErrorBlock
            message={errorMessage}
            setIsError={() => setIsError(false)}
          />
        )}

        <form onSubmit={onSubmitHandler}>
          <div className="block sm:flex sm:justify-between">
            <label htmlFor="firstName">
              First name
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="input mb-4 sm:mb-0"
                required
              />
            </label>
            <label htmlFor="lastName">
              Last name
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="input"
                required
              />
            </label>
          </div>
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
              Sign up
            </button>
            <small className="flex mt-5 text-sm">
              Already have an account?
              <Link
                to="/signin"
                className="text-green hover:text-darkerGreen ml-2"
              >
                Log in
              </Link>
            </small>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
