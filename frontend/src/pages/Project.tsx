import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

import Header from "../components/Header";
import BlogPosts from "../components/BlogPosts";
import ProjectSettings from "../components/ProjectSettings";
import DeleteModal from "../components/DeleteModal";

interface IProjectResponse {
  id: string;
  name: string;
  creator_id: string;
  created_at: string;
  members: IProjectMembersResponse[];
}

interface IProjectMembersResponse {
  id: string;
  name: string;
  project_id: string;
  member_id: string;
  is_creator: boolean;
  role: string;
  created_at: string;
}

const Project = () => {
  const { id: projectId } = useParams() as { id: string };
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectMembers, setProjectMembers] = useState<
    IProjectMembersResponse[]
  >([]);

  const [isPosts, setIsPosts] = useState(true);
  const [isSettings, setIsSettings] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await api.get<IProjectResponse>(
          `/projects/${projectId}`,
          {
            withCredentials: true
          }
        );

        if (response.status === 200) {
          setProjectName(response.data.name);
          setProjectMembers(response.data.members);
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
      {isDeleteModal && (
        <DeleteModal
          setModal={setIsDeleteModal}
          projectId={projectId}
          isProject
        />
      )}
      <div className="w-full min-h-full flex p-5 my-0 ">
        <main className="block w-full space-y-8 mx-auto sm:w-4/5">
          <section className="block sm:flex sm:justify-between">
            <div className="flex">
              <div
                className={`${!isPosts && "opacity-30"}`}
                onClick={() => {
                  setIsPosts(true);
                  setIsSettings(false);
                }}
                onKeyPress={() => {}}
                role="button"
                tabIndex={0}
              >
                <h2 className="h2">Posts</h2>
                {isPosts && <div className="bg-blue w-10 h-3 rounded-md" />}
              </div>
              <div
                className={`ml-6 ${!isSettings && "opacity-30"}`}
                onClick={() => {
                  setIsSettings(true);
                  setIsPosts(false);
                }}
                onKeyPress={() => {}}
                role="button"
                tabIndex={0}
              >
                <h2 className="h2">Settings</h2>
                {isSettings && <div className="bg-blue w-10 h-3 rounded-md" />}
              </div>
            </div>

            {isPosts && (
              <button
                type="button"
                onClick={() => navigate(`/post/?project_id=${projectId}`)}
                className="btn w-full bg-green hover:bg-green mt-2 sm:w-40 sm:mt-0"
              >
                + Add post
              </button>
            )}
          </section>
          {!isSettings ? (
            <BlogPosts projectId={projectId} />
          ) : (
            <ProjectSettings
              projectId={projectId}
              projectName={projectName}
              projectMembers={projectMembers}
              setDeleteModal={setIsDeleteModal}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default Project;
