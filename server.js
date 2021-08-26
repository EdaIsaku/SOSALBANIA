const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);

let backend_id = "";

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/backend"));

app.get("/backend", (req, res) => {
  res.sendFile(__dirname + "/backend/index.html");
});

io.on("connection", (socket) => {
  socket.on("backend_id", (id) => {
    backend_id = id;
  });
  socket.on("location", (loc) => {
    console.log("connected");
    socket.to(backend_id).emit("locationFromUser", loc);
  });
  // socket.on("disconnect", () => {
  //   console.log("disconnected");
  // });
});

server.listen(3000, "192.168.1.76", () => {
  console.log("Server is listening on port 3000");
});
