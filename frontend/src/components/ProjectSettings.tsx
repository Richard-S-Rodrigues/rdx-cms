import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FaTrashAlt, FaUserAlt } from "react-icons/fa";
import { api } from "../services/api";

interface IProjectSettingsProps {
  projectId: string;
  projectName: string;
  projectMembers: IMembers[];
}

interface IMembers {
  id: string;
  name: string;
  project_id: string;
  member_id: string;
  is_creator: boolean;
  role: string;
  created_at: string;
}

const ProjectSettings = ({
  projectId,
  projectName,
  projectMembers
}: IProjectSettingsProps) => {
  const [newProjectName, setNewProjectName] = useState(projectName);
  const [members, setMembers] = useState<IMembers[]>(projectMembers);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isProjectUpdated, setIsProjectUpdated] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: user } = await api.get("/currentSession", {
        withCredentials: true
      });
      const currentMember = members.find(
        (member) => member.member_id === user.id
      );

      if (currentMember?.role === "Administrator") {
        setIsAdmin(true);
      }

      if (currentMember?.is_creator) {
        setIsCreator(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editRoleHandler = (event: any, member: IMembers, index: number) => {
    const { value } = event.target;
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1, { ...member, role: value });
    setMembers(updatedMembers);
  };

  const updateProjectHandler = async () => {
    const membersInfoToUpdate = members.map((member) => ({
      member_id: member.member_id,
      role: member.role
    }));

    try {
      const response = await api.post(
        `/projects/${projectId}/update`,
        {
          name: newProjectName,
          members: membersInfoToUpdate
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setIsProjectUpdated(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }

    setTimeout(() => {
      setIsProjectUpdated(false);
    }, 3000);
  };

  return (
    <section>
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          {isAdmin || isCreator ? (
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
          ) : (
            <div>
              <span>Name</span>
              <h2 className="h2">{newProjectName}</h2>
            </div>
          )}
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
              {members.map((member, index) => (
                <tr key={member.id} className="flex border-b p-4 ">
                  <td className="flex justify-between items-center w-full">
                    <div className="flex items-center mt-2">
                      <FaUserAlt className="w-10 h-10 bg-black text-white rounded-full" />
                      <span className="ml-2">{member.name}</span>
                    </div>
                    <div className="flex items-center">
                      {/* Alow Editing only when the "user editing" is Admin and */}
                      {/* the "user being edited" is not creator */}
                      {isAdmin || isCreator ? (
                        <select
                          value={member.role}
                          onChange={(event) =>
                            editRoleHandler(event, member, index)
                          }
                          className="bg-transparent"
                        >
                          <option value="Administrator">
                            Administrator {member.is_creator && "(Creator)"}{" "}
                          </option>
                          <option value="Editor">
                            Editor {member.is_creator && "(Creator)"}{" "}
                          </option>
                        </select>
                      ) : (
                        <span>
                          {member.role} {member.is_creator && "(Creator)"}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(isCreator || isAdmin) &&
            (isProjectUpdated ? (
              <button
                type="submit"
                className="btn w-full sm:w-40 mt-4 bg-green hover:bg-green transition duration-300 delay-300"
              >
                Project updated
              </button>
            ) : (
              <button
                type="submit"
                onClick={updateProjectHandler}
                className="btn w-full sm:w-40"
              >
                Save updates
              </button>
            ))}
        </form>
      </div>
      {isCreator && (
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
                      Once you delete this project, every content will be
                      removed
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
      )}
    </section>
  );
};

export default ProjectSettings;
