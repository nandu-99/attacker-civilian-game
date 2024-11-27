import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import socket from './socket';

const WinnerAndLeaderboardPage = () => {
  const [winner, setWinner] = useState('');
//   const [leaderboard, setLeaderboard] = useState([]);
//dummy values to see the output of the leaderboard! ^_^
    const [leaderboard, setLeaderboard] = useState([
        { username: 'John Doe', score: 150 },
        { username: 'Jane Smith', score: 120 },
        { username: 'Alex Johnson', score: 110 },
        { username: 'Emily Davis', score: 100 },
        { username: 'Chris Lee', score: 90 },
    ]);
  const [visiblePlayers, setVisiblePlayers] = useState(10); // For infinite scroll

  useEffect(() => {
    // Listen for the winner announcement
    socket.on('gameOver', (data) => {
      setWinner(data.winner);
      setLeaderboard(data.leaderboard);
    });

    // Cleanup listener on unmount or else it will cause a memory leak
    return () => {
      socket.off('gameOver');
    };
  }, []);

  // Infinite scroll handler to show more players
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 50
    ) {
      setVisiblePlayers((prev) => Math.min(prev + 10, leaderboard.length));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [leaderboard]);

  return (
    <div
      style={{
        position: 'relative', // to Ensure the overlay is positioned correctly
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1689443111070-2c1a1110fe82?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', //we can change all the backgronds 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#fff',
        fontFamily: "'Poppins', sans-serif",
        padding: '20px',
      }}
    >
      {/* 30% transparent overlay */} 
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // 30% transparency
        }}
      />

      <div
        style={{
          position: 'relative', // Made sure content is on top of the overlay(content)
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly darker background for contrast with overlay hehe
          borderRadius: '20px',
          padding: '40px 60px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          maxWidth: '700px',
          width: '100%',
          margin: '20px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '40px',
            color: '#FFD700', // Gold for the winner's name we can change this accordinglly
            marginBottom: '20px',
            textShadow: '2px 2px 8px rgba(255, 215, 0, 0.9)',
          }}
        >
          🎉 Winner: {winner} 🎉
        </h1>
        <h2
          style={{
            fontSize: '30px',
            color: '#fff',
            marginBottom: '30px',
            textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
            borderBottom: '2px solid #FFD700',
            display: 'inline-block',
            paddingBottom: '5px',
          }}
        >
          Leaderboard
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            margin: '0',
            maxHeight: '400px',
            overflowY: 'auto',
            marginTop: '20px',
          }}
        >
          {leaderboard.slice(0, visiblePlayers).map((player, index) => (
            <li
              key={index}
              style={{
                background: index === 0 ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                margin: '10px 0',
                padding: '15px 20px',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                color: index === 0 ? '#FFD700' : '#fff', // Highlight first player in gold color
                fontWeight: index === 0 ? 'bold' : 'normal',
                fontSize: '18px',
              }}
            >
              <span>
                {index + 1}. {player.username}
              </span>
              <span>{player.score} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WinnerAndLeaderboardPage;
