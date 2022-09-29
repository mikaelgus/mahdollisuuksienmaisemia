"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("../html"));

const users = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join", (username) => {
    users.push({ username: username, id: socket.id });
    console.log("users connected: ", users);
    io.emit("message", username + " liittyi chattiin");
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    // TODO: remove user with socket.id form users array
  });

  socket.on("message", ({ message }) => {
    console.log({ message });
    //socket.emit("message", message);
    io.emit("message", message);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
