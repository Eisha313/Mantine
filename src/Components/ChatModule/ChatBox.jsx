import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(auth.currentUser);

  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);
  if (!user) {
    return <Welcome />;
  }

  return (
    <>
    <main
      style={{
        color: "brown",
        color: "black",
        marginTop: "2px",
        fontStyle: "bold",
        backgroundColor: "light blue",
        display: "flex",
        flexDirection: "column",
        alignItems: "right",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        height: "550px",
      }}
      className="chat-box"
    >
      <div
        style={{
          maxHeight: "500px",
          overflow: "scroll",
          maxHeight: "500px",
          overflow: "scroll",
          border: "1px solid orange",
          borderRadius: "20px",
          padding: "10px",
          // backgroundColor: "#ADD8E6",

          width: "100%",
          marginBottom: "10px",
        }}
        className="messages-wrapper"
        ref={scroll}
      >
        {messages?.map((message) => (
          <Message key={message.id} message={message} scroll={scroll} />
        ))}
      </div>

      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
    
    <iframe width="560" height="315" src="https://www.youtube.com/embed/HcOc7P5BMi4?si=x7YDVoHSOky2l7Qv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> </>
  );
};

export default ChatBox;
