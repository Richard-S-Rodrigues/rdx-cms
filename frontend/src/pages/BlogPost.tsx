import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../services/api";
import PostPreview from "../components/PostPreview";
import TextEditor from "../components/TextEditor";

const BlogPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorMarkdownContent, setEditorMarkdownContent] = useState("");
  const [editorNewRawContent, setEditorNewRawContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isPostExists, setIsPostExists] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Get project id when post is not created yet
  // Get post id when post was already created
  const [projectId, postId] = useLocation()
    .search.replace("?project_id=", "")
    .replace("post_id=", "")
    .split("&");

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await api.get(
          `/projects/${projectId}/blogPosts/${postId}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsPostExists(true);

          setTitle(response.data.title);
          setDescription(response.data.description);
          setEditorMarkdownContent(response.data.markdown_content);
          setIsPublished(response.data.is_published);

          localStorage.setItem("raw_content", response.data.raw_content);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPost();
    console.log("test");
    // Get post again when post is updated
  }, [isUpdated]);

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isPostExists) {
      await updatePost();
    } else {
      await createPost();
    }
  };

  const createPost = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      const response = await api.post(
        `/projects/${projectId}/createBlogPost`,
        {
          title,
          description,
          markdown_content: editorMarkdownContent,
          raw_content: editorNewRawContent,
          is_published: isPublished
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      const response = await api.post(
        `/projects/${projectId}/updateBlogPost/${postId}`,
        {
          title,
          description,
          markdown_content: editorMarkdownContent,
          raw_content: editorNewRawContent,
          is_published: isPublished
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return isPreview ? (
    <PostPreview
      title={title}
      markdown={editorMarkdownContent}
      setPreview={setIsPreview}
    />
  ) : (
    <div className="w-full block my-10">
      <form
        onSubmit={onSubmitHandler}
        className="w-4/5 block mx-auto sm:w-full sm:flex sm:mx-0 sm:items-center sm:justify-end"
      >
        <div className="sm:flex sm:items-center sm:mr-8">
          {!isUpdated ? (
            <button
              type="submit"
              onClick={() => {
                setIsUpdated(true);
              }}
              className="btn bg-green hover:bg-darkerGreen w-full sm:w-24 sm:h-18 sm:mr-4"
            >
              Save
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-darkerGreen hover:bg-darkerGreen w-full opacity-80 cursor-default sm:w-24 sm:h-18 sm:mr-4"
              disabled
            >
              Saved
            </button>
          )}

          {!isPublished ? (
            !isUpdated ? (
              <button
                type="submit"
                className="btn w-full my-4 sm:w-24 h-18 opacity-50 cursor-default hover:bg-blue"
                disabled
              >
                Publish
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  setIsPublished(true);
                }}
                className="btn w-full my-4 sm:w-24 sm:h-18"
              >
                Publish
              </button>
            )
          ) : (
            <button
              type="submit"
              onClick={() => {
                setIsPublished(false);
              }}
              className="btn bg-red-800 hover:bg-red-800 w-full my-4 sm:w-24 sm:h-18"
            >
              Unpublish
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className="btn bg-yellow-500 hover:bg-yellow-500 w-full sm:w-24 sm:h-18 sm:mr-4"
        >
          Preview
        </button>
      </form>
      <main className="w-4/5 mx-auto mt-10">
        <div>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setIsUpdated(false);
              }}
              className="input mt-2 mb-4"
              required
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setIsUpdated(false);
              }}
              className="input mt-2 h-24"
              required
            />
          </label>
        </div>
        <div className="mt-10 h-3/4">
          <div className="block mb-2">Body content</div>
          <TextEditor
            setEditorMarkdownContent={setEditorMarkdownContent}
            setEditorNewRawContent={setEditorNewRawContent}
            setIsPostUpdated={setIsUpdated}
          />
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
