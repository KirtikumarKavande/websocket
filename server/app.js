import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    
    socket.broadcast.to(data.roomId).emit("receive-message", data.message);
  });
  socket.on("join-room", (roomName) => {
    socket.join(roomName);
    console.log(`user joined to room ${roomName}`);
  });
});



server.listen(3000, () => {
  console.log("server running at port 3000");
});
