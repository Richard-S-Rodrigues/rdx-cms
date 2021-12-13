import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../services/api";

interface IProjectsResponse {
  id: string;
  member_id: string;
  is_creator: boolean;
  project: {
    id: string;
    name: string;
    creator_id: string;
    created_at: string;
  };
  project_id: string;
  role: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<IProjectsResponse[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await api.get("/projects", {
          withCredentials: true
        });

        if (response.status === 200) {
          setProjects(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="w-full min-h-full flex p-5 my-0 ">
      <main className="block w-full space-y-8 mx-auto sm:w-4/5">
        <section>
          <h1 className="h1">
            Projects
            <div className="bg-blue w-10 h-3 rounded-md" />
          </h1>
          <div className="block mt-12 sm:flex sm:h-10">
            <span className="w-full flex justify-between">
              <input
                type="text"
                placeholder="Search..."
                className="input rounded-r-none border-r-0 w-full"
              />
              <span className="flex items-center border rounded-md rounded-l-none px-2">
                <FiSearch className="" />
              </span>
            </span>
            <button
              type="button"
              className="btn w-full mt-2 text-left text-xs font-medium sm:w-44 sm:mt-0 sm:ml-2"
            >
              + NEW PROJECT
            </button>
          </div>
        </section>
        <section className="mt-12">
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer"
              >
                {project.project.name}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Projects;
