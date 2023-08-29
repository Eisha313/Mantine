

import React, { useState, useEffect } from "react";
// import firebase from "firebase/app";
// // import "firebase/firestore";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ConvertedContentPage = () => {
  const [convertedContent, setConvertedContent] = useState("");

  useEffect(() => {
    const fetchConvertedContent = async () => {
      try {
        const convertedTextsRef = firebase.firestore().collection('convertedTexts');
        const snapshot = await convertedTextsRef.get();

        if (!snapshot.empty) {
         
          const documentsData = snapshot.docs.map(doc => doc.data());
             const firstDocumentData = documentsData[0];
          setConvertedContent(firstDocumentData.content);
        }
      } catch (error) {
        console.error('Error fetching converted content:', error);
      }
    };

    fetchConvertedContent();
  }, []);

  return (
    <div>
      <h1>Converted Content</h1>
      <div dangerouslySetInnerHTML={{ __html: convertedContent }} />
    </div>
  );
};

export default ConvertedContentPage;