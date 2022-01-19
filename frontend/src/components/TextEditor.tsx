import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ITextEditorProps {
  setEditorMarkdownContent: React.Dispatch<React.SetStateAction<string>>;
  setEditorHtmlContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor = ({
  setEditorMarkdownContent,
  setEditorHtmlContent
}: ITextEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const markdownContent = draftToMarkdown(rawContent);
    const htmlContent = draftToHtml(rawContent);

    setEditorMarkdownContent(markdownContent);
    setEditorHtmlContent(htmlContent);
  }, [editorState]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      placeholder="Start writing..."
    />
  );
};

export default TextEditor;
