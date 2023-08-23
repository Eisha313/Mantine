import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
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

  return (
    <main style={{color:"brown" ,marginTop:"2px"}}className="chat-box">
      
      <div style={{}}className="messages-wrapper" ref={scroll}>
        {messages?.map((message) => (
          <Message key={message.id} message={message} scroll={scroll} />
        ))}
      </div>
      
      <span ref={scroll}></span>
      <SendMessage style={{position:"fixed"}} scroll={scroll} />
    </main>
  );
};

export default ChatBox;