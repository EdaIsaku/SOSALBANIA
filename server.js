const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

let path = require("path");

const { Server } = require("socket.io");

const io = new Server(server);

let backend_id = "";

let publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

let backendPath = path.join(__dirname, "backend");
app.use(express.static(backendPath));

app.get("/backend", (req, res) => {
  console.log(__dirname + "/backend/index.html");
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
