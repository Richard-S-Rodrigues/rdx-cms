import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface IPostPreviewProps {
  title: string;
  markdown: string;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostPreview = ({ title, markdown, setPreview }: IPostPreviewProps) => (
  <>
    <button
      type="button"
      onClick={() => setPreview(false)}
      className="btn bg-green hover:bg-darkerGreen w-20 h-18 absolute top-5 right-4"
    >
      Editor
    </button>
    <div className="flex items-center justify-center mx-auto">
      <main className="my-20 w-4/5">
        <section>
          <h1 className="h1 text-left break-normal">{title}</h1>
        </section>
        <section className="mt-10">
          <ReactMarkdown
            remarkPlugins={[gfm, remarkBreaks]}
            components={{
              h1: ({ node, ...props }) => (
                // eslint-disable-next-line jsx-a11y/heading-has-content
                <h1 className="h1" {...props} />
              ),
              h2: ({ node, ...props }) => (
                // eslint-disable-next-line jsx-a11y/heading-has-content
                <h2 className="h2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="mt-4 text-base text-justify antialiased sm:text-xl"
                  {...props}
                />
              )
            }}
          >
            {markdown}
          </ReactMarkdown>
        </section>
      </main>
    </div>
  </>
);

export default PostPreview;
