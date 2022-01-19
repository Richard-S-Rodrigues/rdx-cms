import { useState } from "react";
import PostPreview from "../components/PostPreview";
import TextEditor from "../components/TextEditor";

const BlogPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorMarkdownContent, setEditorMarkdownContent] = useState("");
  const [editorHtmlContent, setEditorHtmlContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  return isPreview ? (
    <PostPreview
      title={title}
      markdown={editorMarkdownContent}
      html={editorHtmlContent}
      setPreview={setIsPreview}
    />
  ) : (
    <div className="w-full flex justify-center my-10">
      <button
        type="button"
        onClick={() => setIsPreview(true)}
        className="btn w-20 h-18 absolute top-5 right-4"
      >
        Preview
      </button>
      <main className="w-4/5 mt-10">
        <form>
          <div>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="input mt-2 mb-4"
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="input mt-2 h-24"
              />
            </label>
          </div>
          <div className="mt-10">
            <div className="block mb-2">Body content</div>
            <TextEditor
              setEditorMarkdownContent={setEditorMarkdownContent}
              setEditorHtmlContent={setEditorHtmlContent}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default BlogPost;
