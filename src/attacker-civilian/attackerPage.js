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
    console.log(username)
    socket.emit('/attack', { username, x, y });
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url(https://images.unsplash.com/photo-1689443111384-1cf214df988a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
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
      {civilians.map((civ, index) => (
        <div
          key={index}
          onClick={(e) => handleAttack(civ.username, e)}
          // style={{
          //   position: 'absolute',
          //   left: `${civ.x}px`,
          //   top: `${civ.y}px`,
          //   width: '50px',
          //   height: '50px',
          //   borderRadius: '50%',
          //   backgroundColor: '#5E9DFC',
          //   color: 'white',
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   cursor: 'pointer',
          //   boxShadow: '0 8px 24px rgba(94, 159, 252, 0.5)',
          // }}
          style={{
            position: 'absolute',
            left: `${civ.x}px`,
            top: `${civ.y}px`,
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
          {civ.username[0].toUpperCase()}
          {civ.username[civ.username.length - 1].toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default AttackerPage;
