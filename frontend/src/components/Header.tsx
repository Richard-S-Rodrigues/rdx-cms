import { FaUserAlt } from "react-icons/fa";

const Header = () => (
  <header className="flex items-center justify-between p-4 flex-col sm:flex-row">
    <h1 className="h1 text-4xl">
      Rdx<span className="text-blue">CMS</span>
    </h1>
    <div className="flex items-center mt-2">
      <FaUserAlt className="w-10 h-10 bg-black text-white rounded-full" />
      <span className="ml-2">Richard Rodrigues</span>
    </div>
  </header>
);

export default Header;
