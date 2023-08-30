import React, { useState } from "react";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import ConvertedContentPage from "./ConvertedPage";

import { serverTimestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { Button ,TextInput,Text} from "@mantine/core";
import { DateInput } from "@mantine/dates";





const TextEditor = ({ onConvert }) => {
    const [inputContent, setInputContent] = useState("");
    const [user] = useAuthState(auth);
    
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  const [date, setDate] =useState(new Date());;
  const [pictureLink, setPictureLink] = useState("");
 
  
    const handleEditorChange = (content) => {
      setInputContent(content);
    };
  
    const handleConvert = async() => {
      const plainHtml = editor.getHTML();
    
      
      try {
        const docRef = await addDoc(collection(db, "htmlContents"), {
          content: plainHtml,
          title: title,     
      author: author,     
      date: date,  
          createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        
        setTitle("");
        setAuthor("");
        setDate("");
        setPictureLink("")
        setInputContent("");
}
       catch (error) {
        console.error("Error adding document: ", error);
      }
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
      <div>
        <TextInput
          placeholder="Author Name"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <TextInput
          placeholder="Blog Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <DateInput
          placeholder="Date"
          value={date}
          onChange={(selectedDate) => setDate(selectedDate)}
        />
        <TextInput
          placeholder="Picture Link"
          value={pictureLink}
          onChange={(event) => setPictureLink(event.target.value)}
        />
      </div>
      <Text style={{fontStyle:"italic",fontSize:"20px",fontWeight:"bold",marginLeft:"200px"}}>You can start your blog now</Text>
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

      {/* <Link to="/converted">  <button onClick={handleConvert}>submit</button></Link> */}
      <Button onClick={handleConvert}>Submit</Button>
    </div>
  );
};


const DisplayConvertedHTML = ({ convertedHTML }) => {
    return <div dangerouslySetInnerHTML={{ __html: convertedHTML }} />;
  };
  export default function Reactrenderrr() {
    const [convertedHTML, setConvertedHTML] = useState("");
  
    const handleConvert = (html) => {
      setConvertedHTML(html);
    };
  
    return (
      <div>
        <TextEditor onConvert={handleConvert} />
        {/* <ConvertedContentPage convertedHTML={convertedHTML} /> */}
      </div>
    );
  }
  
  
  
  
  
 
    
  




