import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  return (
    // <div style={{ display: "flex", flexDirection: "row" }}>
    <>
      <div
        style={{ marginTop: "5px", display: "flex" }}
        className={`chat-bubble ${message?.uid === user?.uid ? "right" : ""}`}
      >
        <img
          style={{ height: "40px", border: "1px solid black" }}
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
        />
        <div style={{ marginLeft: "10px" }} className="chat-bubble__right">
          <p
            style={{
              height: "2px",
              color: "black",
              marginTop: "5px",
              fontWeight: "bold",
            }}
            className="user-name"
          >
            {message.name}
          </p>
        </div>
      </div>
      <span ><p style={{marginLeft:"50px",border:"1px solid black",borderRadius:"9px",width:"190px",backgroundColor:"orange"}}className="user-message">{message.text}</p></span>
    </>
  );
};

export default Message;
