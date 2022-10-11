"use strict";

const socket = io("http://localhost:3000");
//const socket = io("https://media-cloud.francecentral.cloudapp.azure.com/");

const toggleBtn = document.getElementById("toggle-chat");
const chatSection = document.getElementById("chat-section");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const username = document.getElementById("username");
const join = document.getElementById("join");
const videoBox = document.getElementById("video-box");
const chatNames = document.getElementById("chat-names");
join.style.display = "block";
form.style.display = "none";
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
  //window.scrollTo(0, document.body.scrollHeight);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("userlist", (msg) => {
  console.log("user list from server", msg);
  chatNames.innerHTML = "Chattaajat: " + msg;
});

socket.on("name taken", (msg) => {
  console.log(msg, " name already taken");
  chatFalse();
});

socket.on("new chat user", (msg) => {
  console.log(msg, "join username disabled");
  join.style.display = "none";
  form.style.display = "block";
});

function toggleChat() {
  if (chatSection.style.display === "none") {
    chatSection.style.display = "block";
    toggleBtn.innerText = "piilota chatti";
    videoBox.style = "grid-column: span 2;";
  } else {
    chatSection.style.display = "none";
    toggleBtn.innerText = "näytä chatti";
    videoBox.style = "grid-column: span 3;";
  }
}

toggleBtn.addEventListener("click", toggleChat);

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
