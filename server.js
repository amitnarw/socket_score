import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

// New connections/user 
io.on("connection", (socket) => {
    console.log("User connected :", socket.id);

    // Checking score updates
    socket.on("updateScore", (scoreData) => {
        console.log("Score update received :", scoreData);

        // Sending new scores to all connected users 
        io.emit("scoreUpdate", scoreData);
    });

    // Disconnecting user from socket if user leaves
    socket.on("disconnect", () => {
        console.log("User disconnected :", socket.id);
    });
});

// Fix the issue in server.listen()
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
