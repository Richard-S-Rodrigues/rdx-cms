import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { FaTrashAlt, FaUserAlt } from "react-icons/fa";

interface IProjectSettingsProps {
  projectName: string;
}

const ProjectSettings = ({ projectName }: IProjectSettingsProps) => {
  const [newProjectName, setNewProjectName] = useState(projectName);

  return (
    <section>
      <div>
        <form>
          <label htmlFor="projectName">
            Name
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={newProjectName}
              onChange={(event) => setNewProjectName(event.target.value)}
              className="input"
            />
          </label>
          <table className="border rounded-md my-10 w-full">
            <thead>
              <tr className="flex border-b p-4 w-full">
                <th>Members</th>
              </tr>
              <tr className="flex justify-between border-b p-4 w-full">
                <th>User</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex border-b p-4 ">
                <td className="flex justify-between items-center w-full">
                  <div className="flex items-center mt-2">
                    <FaUserAlt className="w-10 h-10 bg-black text-white rounded-full" />
                    <span className="ml-2">Richard Rodrigues</span>
                  </div>
                  <div className="flex items-center">
                    <span>Administrator</span>
                    <BiEdit className="w-6 h-6 ml-2" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="btn w-full sm:w-40">
            Save updates
          </button>
        </form>
      </div>
      <div>
        <table className="border border-red-600 rounded-md my-10 w-full">
          <thead>
            <tr className="flex border-b border-red-600 p-4">
              <th className="flex items-center text-red-600">
                <CgDanger className="mr-1" />
                Danger zone
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex p-4">
              <td className="block w-full sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center">
                    <FaTrashAlt className="mr-1" />
                    Delete project
                  </div>
                  <p className="text-gray-500">
                    Once you delete this project, every content will be removed
                  </p>
                </div>
                <button
                  type="button"
                  className="btn w-full border border-red-600 bg-transparent text-red-600 mt-4 hover:bg-red-600 hover:text-white sm:w-40 sm:mt-0"
                >
                  Delete project
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProjectSettings;
