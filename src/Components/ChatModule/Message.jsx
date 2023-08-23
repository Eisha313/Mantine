import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  return (
    <div style={{marginLeft:"80px",marginTop:"5px"}}
      className={`chat-bubble ${message?.uid === user?.uid ? "right" : ""}`}>
      <img 
      style={{height:"40px",
      border:"1px solid black"}}

        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div style={{marginLeft:"60px"}}className="chat-bubble__right">
        
        <p  style={{height:"2px",color:"black" ,fontWeight:"bold"}}className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;