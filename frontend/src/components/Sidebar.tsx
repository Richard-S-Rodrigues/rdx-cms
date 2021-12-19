import { useState } from "react";
import { Link } from "react-router-dom";

import { FaUserAlt, FaProjectDiagram } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { api } from "../services/api";

import Menu from "./Menu";

const SideBar = () => {
  const [isMenu, setIsMenu] = useState(false);

  const logoutHandler = async () => {
    try {
      await api.get("/logout", { withCredentials: true });

      localStorage.removeItem("rdxcms:user_info");
      window.location.reload();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return isMenu ? (
    <Menu setMenu={setIsMenu} />
  ) : (
    <aside className="p-5 w-full bg-gray-100 rounded-r-xl sm:h-auto sm:w-72">
      <main className="w-full flex justify-between sm:block">
        <section>
          <h1 className="h1 text-blue mb-10">RdxCMS</h1>
          <div className="flex items-center mt-4">
            <FaUserAlt className="w-10 h-10 bg-black text-white rounded-full" />
            <span className="ml-2">Richard Rodrigues</span>
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
                  className="flex items-center mt-8 hover:text-green delay-150 duration-300"
                >
                  <FaProjectDiagram className="text-green w-5 h-5" />
                  <span className="ml-2">Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center mt-8 hover:text-green delay-150 duration-300"
                >
                  <FaUserAlt className="text-green w-5 h-5" />
                  <span className="ml-2">My account</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={logoutHandler}
                  className="flex items-center mt-8 hover:text-green delay-150 duration-300"
                >
                  <FiLogOut className="text-green w-5 h-5" />
                  <span className="ml-2">Log out</span>
                </button>
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </aside>
  );
};

export default SideBar;
