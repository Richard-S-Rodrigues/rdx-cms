import { FiSearch } from "react-icons/fi";

const Projects = () => (
  <div className="min-h-full flex pt-5 my-0 mx-auto">
    <main className="block w-full space-y-8 ">
      <section>
        <h1 className="h1">
          Projects
          <div className="bg-blue w-10 h-3 rounded-md" />
        </h1>
        <div className="flex h-10 mt-12">
          <span className="flex justify-between">
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
            className="btn w-44 ml-2 text-left text-xs font-medium"
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
        </ul>
      </section>
    </main>
  </div>
);

export default Projects;
