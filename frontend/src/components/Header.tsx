import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const { first_name: firstName, last_name: lastName } = JSON.parse(
    localStorage.getItem("rdxcms:user_info") || "{}"
  ).user;
  return (
    <header className="flex items-center justify-between p-4 flex-col sm:flex-row">
      <Link to="/">
        <h1 className="h1 text-4xl">
          Rdx<span className="text-blue">CMS</span>
        </h1>
      </Link>
      <div className="flex items-center mt-2">
        <FaUserAlt className="w-10 h-10 bg-black text-white rounded-full" />
        <span className="ml-2">{`${firstName} ${lastName}`}</span>
      </div>
    </header>
  );
};

export default Header;
