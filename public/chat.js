const messageList = document.getElementById("events");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("msg-btn");
const nicknameInput = document.getElementById("nickname");
const nicknameButton = document.getElementById("nick-btn");
const content = {
  message: "",
  nickname: "",
};

const socket = io();

function makeList(message) {
  const li = document.createElement("li");
  li.innerHTML =
    message.name + " says: " + message.message + " at  " + message.time;
  messageList.appendChild(li);
}

sendButton.addEventListener("click", () => {
  const nickname = nicknameInput.value;
  const message = chatInput.value;
  content.message = message;
  content.nickname = nickname;
  socket.emit("message", content);
  chatInput.value = "";
});

nicknameButton.addEventListener("click", () => {
  nicknameInput.placeholder = nickname;
  nicknameInput.disabled = true;
});

socket.on("message", makeList);
