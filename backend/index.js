const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = [];
let gameRunning = false;
let gameTimer;

// Broadcast civilians' updates
const broadcastCivilianUpdates = () => {
  const civilians = players.filter((player) => player.role === 'civilian');
  io.emit('/civilian/connect', civilians);
};
// End the game after 30 seconds
const endGame = () => {
  gameRunning = false;
  clearInterval(gameTimer);

  let winner = '';
  // Calculate the winner (you can choose the logic here, for example, highest score)
  const highestScoringPlayer = players.reduce((max, player) => (player.score > max.score ? player : max), { score: -Infinity });
  winner = highestScoringPlayer.username;
  // Sort all players by score in descending order
  const leaderboard = players
    .map((player) => ({
      username: player.username,
      score: player.score,
    }))
    .sort((a, b) => b.score - a.score);

  // Send the game over and leaderboard to all players
  players.forEach((player) => {
    io.to(player.socketId).emit('gameOver', { winner, leaderboard });
  });

  // Disconnect all players
  players.forEach((player) => {
    io.to(player.socketId).emit('/disconnected', { reason: 'Game Over' });
    io.sockets.sockets.get(player.socketId)?.disconnect(true);
  });

  players = [];
  console.log('Game has ended.');
};



// Update civilian survival status
const updateCivilianSurvival = () => {
  if (!gameRunning) return;

  players.forEach((player) => {
    if (player.role === 'civilian') {
      if (player.score >= 0) {
        player.score += 1;
      } else {
        console.log(`Civilian ${player.username} is out due to negative score!`);
        io.to(player.socketId).emit('/disconnected', { reason: 'Score is below 0' });
        players = players.filter((p) => p.socketId !== player.socketId);
        io.sockets.sockets.get(player.socketId)?.disconnect(true);
        broadcastCivilianUpdates();
      }
    }
  });
};

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('userRegister', ({ username, role }) => {
    if (!gameRunning) {
      gameRunning = true;

      // Start the 30-second game timer
      setTimeout(endGame, 30000);

      // Start periodic updates for civilians
      gameTimer = setInterval(updateCivilianSurvival, 3000);
      console.log('Game has started!');
    }

    const newPlayer = { username, role, position: { x: 0, y: 0 }, score: 0, socketId: socket.id };
    players.push(newPlayer);
    broadcastCivilianUpdates();
  });

  socket.on('/location/change', (location) => {
    if (!gameRunning) return;

    const player = players.find((p) => p.socketId === socket.id);
    if (player) {
      player.position = location;
      broadcastCivilianUpdates();
    }
  });

  socket.on('/attack', ({ username, x, y }) => {
    if (!gameRunning) return;

    const attacker = players.find((p) => p.socketId === socket.id);
    const target = players.find((p) => p.username === username && p.role === 'civilian');

    if (attacker && target) {
      const distance = Math.sqrt(Math.pow(target.position.x - x, 2) + Math.pow(target.position.y - y, 2));

      if (distance <= 70) {
        attacker.score += 5;
        target.score -= 3;

        io.to(attacker.socketId).emit('/score', attacker.score);
        io.to(target.socketId).emit('/score', target.score);

        console.log(`Attacker ${attacker.username} perfectly attacked ${target.username}`);

        if (target.score <= 0) {
          console.log(`Civilian ${target.username} is out!`);
          players = players.filter((p) => p.socketId !== target.socketId);
          broadcastCivilianUpdates();
        }
      } else {
        console.log(`Attack missed: ${attacker.username} missed the attack on ${target.username}`);
      }
    }
  });

  socket.on('disconnect', () => {
    players = players.filter((player) => player.socketId !== socket.id);
    broadcastCivilianUpdates();
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
