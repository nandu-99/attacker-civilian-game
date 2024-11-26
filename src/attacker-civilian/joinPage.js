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
        backgroundColor: '#282c34', // Dark background to contrast with neon colors
        backgroundImage: 'url(https://images.unsplash.com/photo-1689443111130-6e9c7dfd8f9e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for form
          borderRadius: '15px', // Slightly rounder corners
          padding: '40px 60px', // Larger padding to make the form bigger
          textAlign: 'center',
          maxWidth: '450px', // Slightly wider form
          width: '100%',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)', // Stronger shadow for depth
        }}
      >
        <h2
          style={{
            fontSize: '32px', // Larger font size for the title
            fontWeight: '700',
            color: '#B63ED9', // Primary purple color for the heading
            marginBottom: '25px',
            textTransform: 'uppercase',
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
            padding: '15px 20px',
            fontSize: '18px', // Larger font size
            borderRadius: '10px',
            border: '1px solid #FCC0FC', // Light purple border for input
            width: '100%',
            marginBottom: '20px',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            color: '#FCC0FC', // Light purple text color
            outline: 'none',
            transition: 'border-color 0.3s ease-in-out, color 0.3s',
          }}
        />
        <br />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: '15px 20px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #FCC0FC', // Light purple border for select
            width: '100%',
            marginBottom: '20px',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            color: '#FCC0FC',
            outline: 'none',
            transition: 'border-color 0.3s ease-in-out, color 0.3s',
          }}
        >
          <option value="attacker">Attacker</option>
          <option value="civilian">Civilian</option>
        </select>
        <br />
        <button
          onClick={joinGame}
          style={{
            padding: '15px 25px',
            fontSize: '20px', // Larger button font
            backgroundColor: '#B63ED9', // Primary purple background for the button
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.3s, box-shadow 0.3s',
            boxShadow: '0 6px 15px rgba(182, 62, 217, 0.5)', // Enhanced shadow for button
          }}
          disabled={!username.trim()}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#481B9B')} // Darker purple on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = '#B63ED9')} // Back to primary purple
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinPage;