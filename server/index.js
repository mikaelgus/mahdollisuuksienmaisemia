"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("../html"));

let users = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join", (username) => {
    users.push({ username: username, id: socket.id });
    console.log("new users connected: ", users);
    io.emit("message", username + " liittyi chattiin");
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    const disconnectedData = users.find((item) => item.id === `${socket.id}`);
    const disconnectedName = disconnectedData.username;
    console.log("leaving user: ", disconnectedName);
    io.emit("message", disconnectedName + " poistui chatistä");
    users = users.filter((item) => item.id !== `${socket.id}`);
    console.log("updated users connected: ", users);
  });

  socket.on("message", ({ message }) => {
    console.log({ message });
    io.emit("message", message);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
