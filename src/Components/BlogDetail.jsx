// BlogDetail.js
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { Title,Text ,Flex} from "@mantine/core";

const BlogDetail = ({ match }) => {
  const [blogData, setBlogData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "htmlContents", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert Firebase Timestamp to JavaScript Date
          const date = new Date(data.date.seconds * 1000); // Multiply by 1000 to convert seconds to milliseconds
          data.date = date.toLocaleDateString(); // Format the date

          setBlogData(data);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Title style={{marginLeft:"400px"}}>{blogData.title}</Title>
      <Flex style={{gap:"700px"}}>
      <Text>Author: {blogData.author}</Text>
      <Text>Date: {blogData.date}</Text></Flex>
    
      <div style={{height:"auto",width:"600px",border:"1px solid orange",padding:"20px",margin:"auto",marginTop:"50px"}} dangerouslySetInnerHTML={{ __html: blogData.content }} />
    </div>
  );
};

export default BlogDetail;