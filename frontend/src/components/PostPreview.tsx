import ReactMarkdown from "react-markdown";
import dompurify from "dompurify";

interface IPostPreviewProps {
  title: string;
  markdown: string;
  html: string;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostPreview = ({
  title,
  markdown,
  html,
  setPreview
}: IPostPreviewProps) => {
  console.log(markdown);
  console.log(html);
  const sanitizer = dompurify.sanitize;

  return (
    <>
      <button
        type="button"
        onClick={() => setPreview(false)}
        className="btn bg-green hover:bg-darkerGreen w-20 h-18 absolute top-5 right-4"
      >
        Editor
      </button>
      <div className="flex items-center justify-center mx-auto">
        <main className="my-20">
          <section>
            <h1 className="h1">{title}</h1>
          </section>
          <section className="mt-10">
            <div dangerouslySetInnerHTML={{ __html: sanitizer(html) }} />
          </section>
        </main>
      </div>
    </>
  );
};

export default PostPreview;
