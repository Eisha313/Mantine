import React, { useState, useEffect } from "react";

const contactsData = [
  { id: 1, name: "Eisha", chat: [] },
  { id: 2, name: "Esha", chat: [] },
  { id: 3, name: "Shiza", chat: [] },
  { id: 4, name: "isma", chat: [] },
  { id: 5, name: "Mubushra", chat: [] },
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Load chat history from Local Storage if selectedContact changes
    if (selectedContact) {
      const chatHistory = localStorage.getItem(`chat_${selectedContact.id}`);
      if (chatHistory) {
        setSelectedContact((prevContact) => ({
          ...prevContact,
          chat: JSON.parse(chatHistory),
        }));
      }
    }
  }, [selectedContact]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setMessageInput(""); // Clear message input when changing contacts
  };

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      const updatedContacts = contactsData.map((contact) => {
        if (contact.id === selectedContact.id) {
          const updatedChat = [...contact.chat, messageInput];
          localStorage.setItem(
            `chat_${contact.id}`,
            JSON.stringify(updatedChat)
          ); // Save updated chat history
          return {
            ...contact,
            chat: updatedChat,
          };
        }
        return contact;
      });
      setSelectedContact((prevContact) => ({
        ...prevContact,
        chat: [...prevContact.chat, messageInput],
      }));
      setMessageInput("");
    }
  };

  return (
    <div className="app">
      <div className="contact-list">
        {contactsData.map((contact) => (
          <div
            key={contact.id}
            className={`contact ${
              selectedContact === contact ? "selected" : ""
            }`}
            onClick={() => handleContactClick(contact)}
          >
            {contact.name}
          </div>
        ))}
      </div>
      <div className="chat-window">
        {selectedContact ? (
          <div>
            <h2>{selectedContact.name}</h2>
            <div className="chat-messages">
              {selectedContact.chat.map((message, index) => (
                <div key={index} className="message">
                  {message}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={handleMessageChange}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <p>Select a contact to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Chat;