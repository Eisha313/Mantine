
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
  
    const [message, setMessage] = useState("");
    const sendMessage = async (event) => {
      event.preventDefault();
      if (message.trim() === "") {
        alert("Enter valid message");
        return;
      }
      const { uid, displayName, photoURL } = auth.currentUser;
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("");
    };
      
    return (
      <form style={{marginLeft:"300px",marginTop:"20px"}} onSubmit={(event) => sendMessage(event)} className="send-message">
        <input style={{border:"1px solid orange" ,justifyContent:"center",alignItems:"center"}}
          placeholder="Type your text here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button  style={{color:"white",backgroundColor:"Darkorange",marginLeft:"20px",height:"40px",marginTop:"20px",fontStyle:"bold"}}type="submit">Send</button>
      </form>
    );
  };
  
    
export default SendMessage;