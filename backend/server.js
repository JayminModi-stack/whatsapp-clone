require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const statusRoutes = require("./routes/statusRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/status", statusRoutes);

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });
});

setInterval(() => {
  const sql = `DELETE FROM status WHERE created_at < NOW() - INTERVAL 1 DAY`;
  db.query(sql);
}, 3600000);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
