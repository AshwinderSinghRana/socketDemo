import express from "express";
const app = express();

import http from "http";

import cors from "cors";
import { Server } from "socket.io";
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room:${data}`);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("recieveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(6191, () => {
  console.log("Server running");
});
