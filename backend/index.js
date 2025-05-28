import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js"; // Using the app from socket.js

dotenv.config();

const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup for both localhost & deployed frontend
const corsOption = {
  origin: [
    "http://localhost:3000",
    "https://bit-talk-mern-chatapp-xup2-msmc8zvsd-anshika-git13s-projects.vercel.app"
  ],
  credentials: true,
};
app.use(cors(corsOption));

// ✅ Test route to check backend status
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ API routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

// ✅ Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server listening on port ${PORT}`);
});


