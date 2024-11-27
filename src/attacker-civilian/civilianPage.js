import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import socket from './socket';


const CivilianPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.on('/location', (location) => {
      setPosition(location);
    });

    socket.on('/score', (newScore) => {
      console.log(newScore)
      setScore(newScore);
    });

    return () => {
      socket.off('/location');
      socket.off('/score');
    };
  }, []);

  const handleMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y)
    setPosition({ x, y });
    socket.emit('/location/change', { x, y });
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
      onClick={handleMove}
    >
      {/* Background Image with 50% Transparency Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1689443111130-6e9c7dfd8f9e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1, 
        }}
      >
        {/* Semi-transparent overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#B63ED9',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 8px 24px rgba(182, 62, 217, 0.5)',
          transition: 'all 0.3s ease',
        }}
      >
        Me
      </div>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '24px',
          fontWeight: '700',
          color: '#FCC0FC',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default CivilianPage;
