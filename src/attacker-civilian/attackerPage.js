import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const AttackerPage = () => {
  const [civilians, setCivilians] = useState([
    { username: 'JohnDoe', x: 100, y: 150 },
    { username: 'JaneSmith', x: 200, y: 300 },
    { username: 'BobBrown', x: 400, y: 250 },
  ]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    socket.on('/civilian/connect', (newCivilians) => {
      setCivilians(newCivilians);
    });

    socket.on('/civilian/disconnect', (remainingUsernames) => {
      setCivilians((prev) =>
        prev.filter((civ) => remainingUsernames.includes(civ.username))
      );
    });

    socket.on('/score', (newScore) => {
      setScore(newScore);
    });

    return () => {
      socket.off('/civilian/connect');
      socket.off('/civilian/disconnect');
      socket.off('/score');
    };
  }, []);

  const handleAttack = (username, e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log(username);
    socket.emit('/attack', { username, x, y });
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
    >
      {/* Background Image with 50% Transparency Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1689443111384-1cf214df988a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1, // Ensure the background stays behind the content
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opacity black overlay
          }}
        />
      </div>

      {/* Score Display */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '24px',
          fontWeight: '700',
          color: '#FC6F6F',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        Score: {score}
      </div>

      {/* Civilians */}
      {civilians.map((civ, index) => (
        <div
          key={index}
          onClick={(e) => handleAttack(civ.username, e)}
          style={{
            position: 'absolute',
            left: `${civ.x}px`,
            top: `${civ.y}px`,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#3D8BEF', // Blue color for the civilian ball
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 8px 24px rgba(61, 139, 239, 0.5)', // Blue shadow for consistency
            transition: 'all 0.3s ease',
          }}
        >
          {civ.username[0].toUpperCase()}
          {civ.username[civ.username.length - 1].toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default AttackerPage;
