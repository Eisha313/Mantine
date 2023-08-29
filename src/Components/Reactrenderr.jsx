import React, { useState } from "react";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

const TextEditor = ({ onConvert }) => {
    const [inputContent, setInputContent] = useState("");
  
    const handleEditorChange = (content) => {
      setInputContent(content);
    };
  
    const handleConvert = () => {
      // Convert the Tiptap content to plain HTML
      const plainHtml = editor.getHTML();
      onConvert(plainHtml);
    };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content:inputContent,
  });
  return (
    <div>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <button onClick={handleConvert}>Convert</button>
    </div>
  );
};

const DisplayConvertedHTML = ({ convertedHTML }) => {
    return <div dangerouslySetInnerHTML={{ __html: convertedHTML }} />;
  };
  
  const Reactrenderr = () => {
    const [convertedHTML, setConvertedHTML] = useState("");
  
    const convertToHTML = (inputHTML) => {
      setConvertedHTML(inputHTML);
    };
  
    return (
      <div>
        <h1>HTML Content Converter</h1>
        
        <TextEditor onConvert={convertToHTML} />
        <h2>Converted Content</h2>
        <DisplayConvertedHTML convertedHTML={convertedHTML} />
      </div>
    );
  };
  
  export default Reactrenderr;



