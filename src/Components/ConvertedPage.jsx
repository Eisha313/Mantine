

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const BlogTable = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "htmlContents"));
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        author: doc.data().author,
        // date: doc.data().date.toDate().toLocaleDateString(),
        date: doc.data().date ? doc.data().date.toDate().toLocaleDateString() : "", 
      }));
      setBlogPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <table style={{ marginLeft: "auto",marginTop:"150px", marginRight: "auto", border: "1px solid orange", width: "80%", textAlign: "center"}}>
      <thead>
        <tr >
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody style={{marginLeft:"50px"}}>
        {blogPosts.map((post) => (
          <tr key={post.id} >
            <td>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </td>
            <td>{post.author}</td>
            <td>{post.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogTable;
