import { SyntheticEvent, useState } from "react";
import { api } from "../../services/api";

const SendPasswordResetEmail = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!email.trim()) return;

    await sendEmail(email);
  };

  const sendEmail = async (userEmail: string) => {
    try {
      await api.post("/requestPasswordReset", { email: userEmail });
    } catch (err: any) {
      if (err.response) {
        if (err.response.data.error !== "User not found") {
          console.error("Something went wrong");
        }
      }
    }
    setIsEmailSent(true);
  };

  return (
    <div className="min-h-full flex items-center justify-center my-0 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-xl w-full p-5 space-y-8 ">
        {!isEmailSent ? (
          <>
            <h1 className="h1">
              Provide your email for password reset instructions
            </h1>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input"
                  required
                />
              </label>
              <button type="submit" className="btn mt-4 w-full">
                Send Email
              </button>
            </form>
          </>
        ) : (
          <h1 className="text-center font-medium text-base sm:text-2xl">
            If your email is in our database, a password reset link will be
            sent.
          </h1>
        )}
      </main>
    </div>
  );
};

export default SendPasswordResetEmail;
