import React, { useEffect, useState } from 'react';
import './App.css';
import UserForm from './gameComponents/userform';
import { io } from "socket.io-client";
import JoinPage from './attacker-civilian/joinPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = ()=>{
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  const handleJoin = (username, role) => {
    setUsername(username);
    setRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/join" />} />
        <Route path="/join" element={<JoinPage onJoin={handleJoin} />} />
        {/* <Route path="/civilian" element={role === 'civilian' ? <CivilianPage username={username} /> : <Navigate to="/join" />} />
        <Route path="/attacker" element={role === 'attacker' ? <AttackerPage username={username} /> : <Navigate to="/join" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
