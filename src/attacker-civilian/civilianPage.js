import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const CivilianPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.on('/location', (location) => {
      setPosition(location);
    });

    socket.on('/score', (newScore) => {
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
      style={{ position: 'relative', height: '100vh', width: '100vw' }}
      onClick={handleMove}
    >
      <div
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#5E9DFC',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Me
      </div>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default CivilianPage;
