"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("../html"));
//app.use(express.static("../../../var/www/html"));

let users = [];
let usernames = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  io.emit("userlist", usernames);

  socket.on("join", (username) => {
    if (users.some((item) => item.username === `${username}`)) {
      console.log(username, "name found from users");
      socket.emit("name taken", username);
    } else {
      console.log(username, "not found from users");
      users.push({ username: username, id: socket.id });
      usernames.push(username);
      console.log("new users connected: ", users);
      io.emit("message", username + " liittyi chattiin");
      socket.emit("new chat user", username);
      io.emit("userlist", usernames);
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    const disconnectedData = users.find((item) => item.id === `${socket.id}`);
    if (disconnectedData) {
      const disconnectedName = disconnectedData.username;
      console.log("leaving user: ", disconnectedName);
      io.emit("message", disconnectedName + " poistui chatistä");
      users = users.filter((item) => item.id !== `${socket.id}`);
      usernames = usernames.filter((item) => item !== `${disconnectedName}`);
      io.emit("userlist", usernames);
      console.log("updated users connected: ", users);
    }
  });

  socket.on("message", ({ message }) => {
    console.log({ message });
    io.emit("message", message);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
