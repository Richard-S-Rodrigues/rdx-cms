import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ITextEditorProps {
  setEditorMarkdownContent: React.Dispatch<React.SetStateAction<string>>;
  setEditorNewRawContent: React.Dispatch<React.SetStateAction<string>>;
  setIsPostUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  editorRawContent: string;
}

const TextEditor = ({
  setEditorMarkdownContent,
  setEditorNewRawContent,
  setIsPostUpdated,
  editorRawContent
}: ITextEditorProps) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw(JSON.parse(editorRawContent || "{}"))
    ) || EditorState.createEmpty()
  );

  useEffect(() => {
    setIsPostUpdated(false);

    const rawContent = convertToRaw(editorState.getCurrentContent());
    const markdownContent = draftToMarkdown(rawContent);

    setEditorNewRawContent(JSON.stringify(rawContent));
    setEditorMarkdownContent(markdownContent);
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
