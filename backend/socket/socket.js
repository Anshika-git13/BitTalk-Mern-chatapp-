import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

// 🔹 Enable CORS for Express
app.use(cors({
  origin: ['http://localhost:3000', 'https://bit-talk-mern-chatapp-xup2-msmc8zvsd-anshika-git13s-projects.vercel.app'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 🔹 Enable JSON parsing for POST/PUT requests
app.use(express.json());

const server = http.createServer(app);

// 🔹 Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://bit-talk-mern-chatapp-xup2-msmc8zvsd-anshika-git13s-projects.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// 🔹 In-memory user map
const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// 🔹 Socket.IO connection listener
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server };


