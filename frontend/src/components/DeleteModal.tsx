import { SyntheticEvent, useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { api, logout } from "../services/api";
import ErrorBlock from "./ErrorBlock";

interface IDeleteModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectId?: string;
  isProject?: boolean;
  isAccount?: boolean;
}

const DeleteModal = ({
  setModal,
  projectId,
  isProject,
  isAccount
}: IDeleteModalProps) => {
  const [userEmail, setUserEmail] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      userEmail.trim() &&
      userPassword.trim() &&
      (isProject
        ? confirmDelete === "Delete project"
        : isAccount && confirmDelete === "Delete account")
    ) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [userEmail, confirmDelete, userPassword]);

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!userEmail.trim() || !confirmDelete.trim() || !userPassword.trim()) {
      return;
    }

    await checkUser(userEmail, userPassword);
  };

  const checkUser = async (email: string, password: string) => {
    try {
      const response = await api.post("/signin", { email, password });

      if (response.status === 200) {
        if (isProject) {
          await deleteProject();
        } else if (isAccount) {
          await deleteAccount();
        }
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.response.data.error);
    }
  };

  const deleteProject = async () => {
    try {
      const response = await api.post(
        "/project/delete",
        { project_id: projectId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await api.post(
        "/removeAccount",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        logout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isError && <ErrorBlock message={errorMessage} setIsError={setIsError} />}
      <div className="w-full h-full fixed flex items-center justify-center top-0 m-0 p-0 bg-black bg-opacity-30 z-10">
        <main className="w-11/12 bg-white rounded-md sm:w-4/5 p-4">
          <div className="border-b flex items-center justify-between">
            <h2 className="h2">Are you sure you want to do this?</h2>
            <HiX
              className="w-8 h-8 cursor-pointer"
              onClick={() => setModal(false)}
            />
          </div>
          <section className="my-4">
            {isAccount ? (
              <>
                <p className="text-justify">
                  This will immediately delete your account and every project
                  that you <b>owns.</b>
                </p>
                <p className="text-justify">
                  Also, it will remove you from every project you participate,
                  as <b>Administrator</b> or <b>Editor</b>
                </p>
              </>
            ) : (
              <p className="text-justify">
                This will immediately delete your project and you won't be able
                to recover
              </p>
            )}
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
              <label htmlFor="confirmDelete">
                To verify, type{" "}
                {isAccount ? <i>Delete account</i> : <i>Delete project</i>}{" "}
                below:
                <input
                  type="text"
                  id="confirmDelete"
                  value={confirmDelete}
                  onChange={(event) => setConfirmDelete(event.target.value)}
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
                  {isAccount ? "Delete account" : "Delete project"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled
                  className="btn bg-red-800 hover:bg-red-800 w-full cursor-default"
                >
                  {isAccount ? "Delete account" : "Delete project"}
                </button>
              )}
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

DeleteModal.defaultProps = {
  projectId: "",
  isProject: false,
  isAccount: false
};

export default DeleteModal;
