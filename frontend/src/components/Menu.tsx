import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { FaUserAlt, FaProjectDiagram } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

interface IMenuProps {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ setMenu }: IMenuProps) => (
  <div className="h-auto fixed inset-0 z-10 flex justify-center mx-auto bg-gray-100">
    <HiX
      className="text-black w-8 h-8 absolute top-4 right-4 cursor-pointer"
      onClick={() => setMenu(false)}
    />
    <main className="mt-32">
      <nav>
        <ul>
          <li className="mt-10 text-2xl">
            <Link
              to="/"
              className="flex items-center hover:text-green delay-150 duration-300"
            >
              <FaProjectDiagram className="text-green w-5 h-5" />
              <span className="ml-2">Projects</span>
            </Link>
          </li>
          <li className="mt-10 text-2xl">
            <Link
              to="/"
              className="flex items-center hover:text-green delay-150 duration-300"
            >
              <FaUserAlt className="text-green w-5 h-5" />
              <span className="ml-2">My account</span>
            </Link>
          </li>
          <li className="mt-10 text-2xl">
            <Link
              to="/"
              className="flex items-center hover:text-green delay-150 duration-300"
            >
              <FiLogOut className="text-green w-5 h-5" />
              <span className="ml-2">Log out</span>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  </div>
);

export default Menu;
