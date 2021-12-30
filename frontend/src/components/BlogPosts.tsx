import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

const fakedData = [
  {
    id: "0",
    title: "Post 1",
    createdAt: "Nov 3, 2021",
    author: "Richard Rodrigues",
    isPublished: false
  },
  {
    id: "1",
    title: "Post 2",
    createdAt: "Nov 3, 2021",
    author: "Richard Rodrigues",
    isPublished: true
  }
];
const BlogPosts = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(fakedData.length + 1).fill(false)
  );
  const [isChecked, setIsChecked] = useState(false);
  const [posts, setPosts] = useState(fakedData);

  const checkedCount = checkedState.filter(
    (value: boolean, index: number) => value === true && index !== 0
  ).length;

  const checkboxChangeHandler = (event: any, position: number) => {
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
        const updatedData = fakedData.splice(index, 1);
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
                  onChange={(event) => checkboxChangeHandler(event, 0)}
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
            {posts.map((post, index) => {
              // Starts at "1", because "0" is reserved by "Title" checkbox
              const position = index + 1;
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
                      onChange={(event) =>
                        checkboxChangeHandler(event, position)
                      }
                      className="mr-1"
                    />
                    {post.title}
                  </td>
                  <td className="flex float-left w-full">{post.createdAt}</td>
                  <td className="flex float-left w-full">{post.author}</td>
                  <td className="flex items-center float-left w-full">
                    {post.isPublished ? (
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
