import { Link } from "react-router-dom";
import { FaUserAlt, FaProjectDiagram } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const SideBar = () => (
  <aside className="p-5 h-full bg-gray-100 rounded-r-xl">
    <main className="w-full">
      <section className="mb-12">
        <h1 className="h1 text-blue">RdxCMS</h1>
      </section>
      <section>
        <Link to="/" className="flex my-12 items-center">
          <FaUserAlt className="w-10 h-10 bg-black text-white rounded-full" />
          <span className="ml-2">Richard Rodrigues</span>
        </Link>
      </section>
      <section className="my-12">
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className="flex my-6 items-center hover:text-green delay-150 duration-300"
              >
                <FaProjectDiagram className="text-green w-5 h-5" />
                <span className="ml-2">Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex my-6 items-center hover:text-green delay-150 duration-300"
              >
                <FaUserAlt className="text-green w-5 h-5" />
                <span className="ml-2">My account</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex my-6 items-center hover:text-green delay-150 duration-300"
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

export default SideBar;
