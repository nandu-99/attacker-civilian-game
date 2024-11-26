import React, { useState } from 'react';

const ChatWindow = ({messages}) => {

    return (
        <div className="chat-window">
            {messages.map((msg, index) => (
                <div 
                    key={index} 
                    className={`chat-message ${msg.from === 'user' ? 'user-message' : 'bot-message'}`}
                >
                    {msg.message}
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;
