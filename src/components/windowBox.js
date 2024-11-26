import React from "react";

const WindowBox = ({ messages }) => {
  return (
    <div className="window-box">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default WindowBox;
