import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await api.get("/projects", { withCredentials: true });
        console.log(response);
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
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 1
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 2
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 3
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 4
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 5
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 6
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 7
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 8
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 9
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 10
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 11
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 12
            </li>
            <li className="border p-4 h2 mt-4 hover:bg-gray-200 hover:text-green delay-150 duration-300 cursor-pointer">
              Project 13
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Projects;
