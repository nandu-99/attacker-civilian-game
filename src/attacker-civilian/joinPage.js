import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from './socket';

const JoinPage = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('attacker');
  const navigate = useNavigate();

  const joinGame = () => {
    if (username.trim()) {
      socket.emit('userRegister', { username, role });
      onJoin(username, role);
      navigate(`/${role}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#282c34',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1689443111130-6e9c7dfd8f9e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '15px',
          padding: '40px 60px',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
          marginBottom: '20px',
        }}
      >
        <h2
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#B63ED9',
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
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #FCC0FC',
            width: '100%',
            marginBottom: '20px',
            backgroundColor: 'transparent',
            color: '#FCC0FC',
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
            border: '1px solid #FCC0FC',
            width: '100%',
            marginBottom: '20px',
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
            fontSize: '20px',
            backgroundColor: '#B63ED9',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.3s, box-shadow 0.3s',
            boxShadow: '0 6px 15px rgba(182, 62, 217, 0.5)',
          }}
          disabled={!username.trim()}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#481B9B')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#B63ED9')}
        >
          Join
        </button>
      </div>

      {/* Rules Section */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '15px',
          padding: '20px 30px',
          maxWidth: '600px',
          width: '100%',
          color: '#FCC0FC',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h3
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#FCC0FC',
            marginBottom: '15px',
          }}
        >
          Rules to Play
        </h3>
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            fontSize: '16px',
            textAlign: 'left',
            color: '#FFF',
          }}
        >
          <li style={{ marginBottom: '10px' }}>1. Enter your username to join the game.</li>
          <li style={{ marginBottom: '10px' }}>
            2. Choose your role: <span style={{ color: '#B63ED9' }}>Attacker</span> or{' '}
            <span style={{ color: '#B63ED9' }}>Civilian</span>.
          </li>
          <li style={{ marginBottom: '10px' }}>
            3. Collaborate with your teammates to achieve victory!
          </li>
          <li style={{ marginBottom: '10px' }}>4. Attackers must strategize to win.</li>
          <li>5. Civilians must survive and evade attackers.</li>
        </ul>
      </div>
    </div>
  );
};

export default JoinPage;
