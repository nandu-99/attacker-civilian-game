import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Initialize once and reuse

export default socket;
