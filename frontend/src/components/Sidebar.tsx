import { Link } from "react-router-dom";
import { FaUserAlt, FaProjectDiagram } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { useState } from "react";
import Menu from "./Menu";

const SideBar = () => {
  const [isMenu, setIsMenu] = useState(false);

  return isMenu ? (
    <Menu setMenu={setIsMenu} />
  ) : (
    <aside className="p-5 w-full bg-gray-100 rounded-r-xl sm:h-full sm:max-w-min">
      <main className="w-full flex justify-between sm:block">
        <section className="">
          <h1 className="h1 text-blue mb-10">RdxCMS</h1>
          <div className="flex items-center mt-4">
            <FaUserAlt className="w-5 h-5 bg-black text-white rounded-full sm:w-7 sm:h-7" />
            <span className="ml-2 text-xs">Richard Rodrigues</span>
          </div>
        </section>
        <section className="mt-1">
          <button
            type="button"
            className="w-5 h-5 cursor-pointer sm:hidden"
            onClick={() => setIsMenu(true)}
          >
            <div className="bg-black h-1 rounded-sm" />
            <div className="bg-black h-1 rounded-sm mt-1" />
            <div className="bg-black h-1 rounded-sm mt-1" />
          </button>
          <nav className="hidden sm:block">
            <ul>
              <li>
                <Link
                  to="/"
                  className="flex items-center mt-4 hover:text-green delay-150 duration-300"
                >
                  <FaProjectDiagram className="text-green w-5 h-5" />
                  <span className="ml-2">Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center mt-4 hover:text-green delay-150 duration-300"
                >
                  <FaUserAlt className="text-green w-5 h-5" />
                  <span className="ml-2">My account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center mt-4 hover:text-green delay-150 duration-300"
                >
                  <FiLogOut className="text-green w-5 h-5" />
                  <span className="ml-2">Log out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </aside>
  );
};

export default SideBar;
