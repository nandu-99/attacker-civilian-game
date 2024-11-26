import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io('http://localhost:3000'); 

const JoinPage = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('attacker');
  const navigate = useNavigate()

  const joinGame = () => {
    if (username.trim()) {
        socket.emit('userRegister', { username, role });
        onJoin(username, role);
        navigate(`/${role}`)
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7fa',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px 50px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          Join Game
        </h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '12px 15px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            marginBottom: '15px',
            boxSizing: 'border-box',
          }}
        />
        <br />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: '12px 15px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '100%',
            marginBottom: '15px',
            boxSizing: 'border-box',
          }}
        >
          <option value="attacker">Attacker</option>
          <option value="civilian">Civilian</option>
        </select>
        <br />
        <button
          onClick={joinGame}
          style={{
            padding: '12px 20px',
            fontSize: '18px',
            backgroundColor: '#5E9DFC',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.3s',
          }}
          disabled={!username.trim()}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinPage;
