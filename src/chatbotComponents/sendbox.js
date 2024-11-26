import React, { useState } from "react";
import { getResponse } from "../api";

const SendBox = ({ setMessages }) => {
  const [value, setValue] = useState("");

  const sendMessage = async () => {
    if (!value.trim()) return; 
    setMessages((messages) => [
      ...messages,
      { from: "user", message: value },
    ]);
    const botMessage = await getResponse(value);
    setMessages((messages) => [
      ...messages,
      { from: "bot", message: botMessage.message },
    ]);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      sendMessage();
      setValue("")
    }
  };


  return (
    <div className="send-box">
      <input
        type="text"
        placeholder="Type your message..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={handleKeyDown} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SendBox;
