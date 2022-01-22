import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import { api } from "../services/api";

interface IBlogPostsProps {
  projectId: string;
}

interface IPostData {
  id: string;
  title: string;
  description: string;
  content: string;
  project_id: string;
  author_id: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  project: {
    id: string;
    name: string;
    creator_id: string;
    created_at: string;
  };
  author: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const BlogPosts = ({ projectId }: IBlogPostsProps) => {
  const [posts, setPosts] = useState([]);
  const [checkedState, setCheckedState] = useState([] as boolean[]);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/blogPosts`, {
          withCredentials: true
        });

        if (response.status === 200) {
          setPosts(response.data);
          setCheckedState(new Array(response.data.length + 1).fill(false));
        }
      } catch (err) {
        console.error(err);
      }
    };

    getBlogPosts();
  }, []);

  const checkedCount = checkedState.filter(
    (value: boolean, index: number) => value === true && index !== 0
  ).length;

  const checkboxChangeHandler = (position: number) => {
    let updatedCheckedState: boolean[];

    setIsChecked(true);
    if (position === 0) {
      // Check/Uncheck all
      updatedCheckedState = checkedState.map((item: boolean) =>
        item === checkedState[0] ? !item : item
      );
    } else {
      if (checkedState[0] === true) {
        checkedState[0] = false;
      }
      updatedCheckedState = checkedState.map((item: boolean, index: number) =>
        index === position ? !item : item
      );
    }
    setCheckedState(updatedCheckedState);
  };

  const deletePostHandler = () => {
    checkedState.forEach((item: boolean, index: number) => {
      if (item === true) {
        const updatedData = posts.splice(index, 1);
        setPosts(updatedData);
        checkedState[index] = false;
      }
    });
  };

  return (
    <>
      {isChecked && checkedCount !== 0 && (
        <div className="flex">
          <span>{checkedCount} item(s) selected</span>
          <button
            type="button"
            className="flex items-center ml-4 text-red-600"
            onClick={deletePostHandler}
          >
            <FaTrashAlt className="mr-1" /> Delete
          </button>
        </div>
      )}
      <section className="overflow-x-auto">
        <table
          className="border rounded-md my-2 w-full"
          style={{ minWidth: "40em" }}
        >
          <thead>
            <tr className="flex justify-between border-b p-4 w-full">
              <th className="flex float-left w-full">
                <input
                  type="checkbox"
                  value="Title"
                  id="0"
                  checked={checkedState[0]}
                  onChange={() => checkboxChangeHandler(0)}
                  className="mr-1"
                />
                Title
              </th>
              <th className="flex float-left w-full">Updated</th>
              <th className="flex float-left w-full">Author</th>
              <th className="flex float-left w-full">Status</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: IPostData, index: number) => {
              // Starts at "1", because "0" is reserved by "Title" checkbox
              const position = index + 1;
              const updatedAt = moment(post.updated_at).format("lll");

              return (
                <tr
                  key={post.id}
                  className="flex justify-between items-center border-b p-4 w-full"
                >
                  <td className="flex float-left w-full">
                    <input
                      type="checkbox"
                      value={post.title}
                      id={post.id}
                      checked={checkedState[position]}
                      onChange={() => checkboxChangeHandler(position)}
                      className="mr-1"
                    />
                    {post.title}
                  </td>
                  <td className="flex float-left w-full">{updatedAt}</td>
                  <td className="flex float-left w-full">{`${post.author.first_name} ${post.author.last_name}`}</td>
                  <td className="flex items-center float-left w-full">
                    {post.is_published ? (
                      <div className="bg-darkerGreen text-white font-semibold w-full p-2 flex items-center justify-center">
                        PUBLISHED
                      </div>
                    ) : (
                      <div className="bg-yellow-400 text-white font-semibold w-full p-2 flex items-center justify-center">
                        DRAFT
                      </div>
                    )}
                    <BiEdit
                      className="w-10 h-10 ml-2"
                      role="button"
                      data-tip="Edit"
                      data-for="tooltipEdit"
                      data-place="top"
                      onClick={() =>
                        navigate(
                          `/post/?project_id=${projectId}&post_id=${post.id}`
                        )
                      }
                    />
                    <ReactTooltip id="tooltipEdit" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default BlogPosts;
