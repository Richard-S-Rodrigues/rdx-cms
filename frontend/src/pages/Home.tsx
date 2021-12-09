import SideBar from "../components/Sidebar";
import Projects from "../components/Projects";

const Home = () => (
  <div className="block sm:flex w-full h-full">
    <SideBar />
    <Projects />
  </div>
);

export default Home;
