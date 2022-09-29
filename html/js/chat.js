"use strict";

const socket = io("http://localhost:3000");

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const username = document.getElementById("username");
const join = document.getElementById("join");

let user;

join.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value) {
    socket.emit("join", username.value);
    user = username.value;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    //  const package = {room: room, message: user + ": " + input.value};
    const pack = { message: user + ": " + input.value };
    socket.emit("message", pack);
    console.log("message", user + ": " + input.value);
    console.log("package: ", pack);
    input.value = "";
  }
});

socket.on("message", (msg) => {
  console.log(msg);
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
