import ReactMarkdown from "react-markdown";

interface IPostPreviewProps {
  title: string;
  markdown: string;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostPreview = ({ title, markdown, setPreview }: IPostPreviewProps) => {
  console.log(markdown);
  return (
    <>
      <button
        type="button"
        onClick={() => setPreview(false)}
        className="btn bg-green hover:bg-darkerGreen w-20 h-18 absolute top-5 right-4"
      >
        Editor
      </button>
      <div>
        <main>
          <section>
            <h1 className="h1">{title}</h1>
          </section>
          <section>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </section>
        </main>
      </div>
    </>
  );
};

export default PostPreview;
