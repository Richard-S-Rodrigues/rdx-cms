import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

import Header from "../components/Header";
import BlogPosts from "../components/BlogPosts";

const Project = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await api.get(`/projects/${projectId}`, {
          withCredentials: true
        });

        if (response.status === 200) {
          console.log(response);
        }
      } catch (err: any) {
        console.error(err.response.data.error);
        navigate("/");
      }
    };
    getProject();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full min-h-full flex p-5 my-0 ">
        <main className="block w-full space-y-8 mx-auto sm:w-4/5">
          <section className="block sm:flex sm:justify-between">
            <div>
              <h2 className="h2">Posts</h2>
              <div className="bg-blue w-10 h-3 rounded-md" />
            </div>
            <button type="button" className="btn w-full mt-2 sm:w-40 sm:mt-0">
              + Add post
            </button>
          </section>
          <BlogPosts />
        </main>
      </div>
    </>
  );
};

export default Project;
