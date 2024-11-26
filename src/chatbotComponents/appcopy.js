import React, { useState } from 'react';
import Header from './chatbotComponents/header';
import ChatWindow from './chatbotComponents/chatwindow';
import SendBox from './chatbotComponents/sendbox';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([
    {
        from: "user", 
        message: "hello, how are u"
    }, 
    {
        from: "bot", 
        message: "im good"
    }
  ]);
  return (
    <div>
      <Header />
      <ChatWindow messages = {messages}/>
      <SendBox setMessages={setMessages}/>
    </div>
  );
};

export default App;
