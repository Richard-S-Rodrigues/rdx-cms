import { SyntheticEvent, useState } from "react";
import { HiX } from "react-icons/hi";

interface INewProjectModalProps {
  setIsNewProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  addNewProject: (name: string) => void;
}

const NewProjectModal = ({
  setIsNewProjectModal,
  addNewProject
}: INewProjectModalProps) => {
  const [projectName, setProjectName] = useState("");

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!projectName.trim()) return;

    await addNewProject(projectName);
  };

  return (
    <div className="w-full h-full fixed flex items-center justify-center m-0 p-0 bg-black bg-opacity-30 z-10">
      <main className="bg-white rounded-md w-4/5">
        <header className="bg-gray-100 p-4 flex items-center justify-between">
          <h1 className="h1">Start a new Project</h1>
          <HiX
            className="w-10 h-10 cursor-pointer"
            onClick={() => setIsNewProjectModal(false)}
          />
        </header>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="projectName" className="block my-8 mx-4">
            Project name
            <input
              type="text"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className="input"
              required
            />
          </label>
          <button type="submit" className="btn w-full rounded-t-none">
            Create project
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewProjectModal;
