import { SyntheticEvent, useEffect, useState } from "react";
import { HiX } from "react-icons/hi";

interface IDeleteAccountModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccountModal = ({ setModal }: IDeleteAccountModalProps) => {
  const [userEmail, setUserEmail] = useState("");
  const [deleteAccountConfirm, setDeleteAccountConfirm] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (
      userEmail.trim() ||
      userPassword.trim() ||
      deleteAccountConfirm.trim() === "Delete my account"
    ) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [userEmail, deleteAccountConfirm, userPassword]);

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (
      !userEmail.trim() ||
      !deleteAccountConfirm.trim() ||
      !userPassword.trim()
    ) {
      return;
    }
  };

  return (
    <div className="w-full h-full fixed flex items-center justify-center top-0 m-0 p-0 bg-black bg-opacity-30 z-10">
      <main className="bg-white rounded-md w-4/5 p-4">
        <div className="border-b flex items-center justify-between">
          <h2 className="h2">Are you sure you want to do this?</h2>
          <HiX
            className="w-8 h-8 cursor-pointer"
            onClick={() => setModal(false)}
          />
        </div>
        <section className="my-4">
          <p>
            This will immediately delete your account and every project that you{" "}
            <b>owns.</b>
          </p>
          <p>
            Also, it will remove you from every project you participate, as{" "}
            <b>Administrator</b> or <b>Editor</b>
          </p>
        </section>
        <section>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                className="input mb-3"
                required
              />
            </label>
            <label htmlFor="deleteAccountConfirm">
              To verify, type <i>Delete my account</i> below:
              <input
                type="text"
                id="deleteAccountConfirm"
                value={deleteAccountConfirm}
                onChange={(event) =>
                  setDeleteAccountConfirm(event.target.value)
                }
                className="input mb-3"
                required
              />
            </label>
            <label htmlFor="password">
              Confirm your password:
              <input
                type="password"
                id="password"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
                className="input mb-3"
                required
              />
            </label>

            {isVerified ? (
              <button
                type="submit"
                className="btn bg-red-600 hover:bg-red-600 w-full"
              >
                Delete your account
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="btn bg-red-800 hover:bg-red-800 w-full cursor-default"
              >
                Delete your account
              </button>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default DeleteAccountModal;
