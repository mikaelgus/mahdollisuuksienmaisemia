"use strict";

const socket = io("http://localhost:3000");

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const username = document.getElementById("username");
const join = document.getElementById("join");
document.getElementById("chatBtn").disabled = true;
document.getElementById("joinBtn").disabled = false;

let user;

join.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value) {
    user = username.value;
    socket.emit("join", user);
    chatTrue();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const pack = { message: user + ": " + input.value };
    socket.emit("message", pack);
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

socket.on("userlist", (msg) => {
  console.log("user list from server", msg);
});

socket.on("name taken", (msg) => {
  console.log(msg, " name already taken");
  chatFalse();
});

function chatTrue() {
  document.getElementById("joinBtn").disabled = true;
  document.getElementById("chatBtn").disabled = false;
  document.getElementById("nameError").innerText = "";
}
function chatFalse() {
  document.getElementById("joinBtn").disabled = false;
  document.getElementById("chatBtn").disabled = true;
  document.getElementById("nameError").innerText = "Chattinimi on jo käytössä";
}