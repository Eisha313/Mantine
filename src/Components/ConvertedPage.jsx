
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// const  ConvertedContentPage =() => {
//   const [htmlContents, setHtmlContents] = useState([]);

//   useEffect(() => {
//     const fetchHtmlContents = async () => {
//       const querySnapshot = await getDocs(collection(db, "htmlContents"));
//       const contents = [];
//       querySnapshot.forEach((doc) => {
//         contents.push({ id: doc.id, ...doc.data() });
//       });
//       setHtmlContents(contents);
//     };
//     fetchHtmlContents();
//   }, []);

//   return (
//     <div>
//       {htmlContents.map((content) => (
//         <div key={content.id} dangerouslySetInnerHTML={{ __html: content.content }} />
//       ))}
//     </div>
//   );
// };

// export default ConvertedContentPage;










// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import { Link } from "react-router-dom";

// const BlogList = () => {
//   const [blogPosts, setBlogPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const querySnapshot = await getDocs(collection(db, "htmlContents"));
//       const posts = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         title: doc.data().title,
//       }));
//       setBlogPosts(posts);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {blogPosts.map((post) => (
//         <div key={post.id}>
//           <Link to={`/blog-detail/${post.id}`}>{post.title}</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogList;


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
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {blogPosts.map((post) => (
          <tr key={post.id}>
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
