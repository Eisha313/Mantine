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
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";



// const firebaseConfig = {
//     apiKey: "AIzaSyCDhiWH4gwD92KS7GIzR9EZ-OFJYaZ0WZ8",
//     authDomain: "usquareproject.firebaseapp.com",
//     projectId: "usquareproject",
//     storageBucket: "usquareproject.appspot.com",
//     messagingSenderId: "725696446880",
//     appId: "1:725696446880:web:2151961cb65d0edc6de4c5",
//     measurementId: "G-BQ8NHDKP2D"
//   };
//   firebase.initializeApp(firebaseConfig);
  
//   const db = firebase.firestore();

const TextEditor = ({ onConvert }) => {
    const [inputContent, setInputContent] = useState("");
  
    const handleEditorChange = (content) => {
      setInputContent(content);
    };
  
    const handleConvert = async() => {
    //     const { uid, displayName, photoURL } = auth.currentUser;
    //   await addDoc(collection(db, "messages"), {
    //     text: message,
    //     name: displayName,
    //     avatar: photoURL,
    //     createdAt: serverTimestamp(),
    //     uid,
    //   });
    //   setMessage("");
    // };
      // Convert the Tiptap content to plain HTML
      const plainHtml = editor.getHTML();
      onConvert(plainHtml);
      try {
        
        // await db.collection('convertedTexts').add({
            await addDoc(collection(db,"messages"),{
          content: plainHtml,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
  
        
      } catch (error) {
        console.error('Error saving to Firebase:', error);
      }
    };
    ;
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

      <Link to="/converted">  <button onClick={handleConvert}>submit</button></Link>
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
        <ContentPage convertedHTML={convertedHTML} />
      </div>
    );
  }
  
  
  
  
  
 
    
  




