const socket = io();

socket.on("registered", (onlineUserList) => {
  makeOnlineUserList(onlineUserList);

  localStorage.setItem("onlineUserList", JSON.stringify(onlineUserList));
  socket.emit("actual-user", socket.id);
});

const myProfile = JSON.parse(localStorage.getItem("myProfile"));
console.log(myProfile);

setTimeout(() => {
  createProfile(myProfile);
}, 1000);

makeOnlineUserList(JSON.parse(localStorage.getItem("onlineUserList")));

function makeOnlineUserList(arr) {
  const ul = document.querySelector(".online-user-list");
  ul.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("span");
    img.style.width = "1em";
    img.style.height = "1em";
    img.style.borderRadius = "50%";
    img.style.marginRight = "0.5em";
    img.src = arr[i].url;
    name.innerHTML = `${arr[i].name}`;
    div.appendChild(img);
    div.appendChild(name);
    li.appendChild(div);
    div.style.display = "flex";
    div.style.justifyContent = "flex-start";
    li.style.listStyle = "none";
    li.style.margin = "0.5em";
    

    

    ul.appendChild(li);
  }

  const onlineHeader = document.querySelector("#online-header");
  onlineHeader.innerHTML = `${arr.length} online`;
}

function createProfile(myProfile) {
  const img = document.createElement("img");
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.borderRadius = "50%";

  const profile = document.querySelector(".profile");
  img.src = myProfile.url;
  img.classList.add("profile-avatar");
  profile.appendChild(img);
  const name = document.createElement("h1");
  name.innerHTML = `${myProfile.name}`;
  profile.appendChild(name);
}

const msgBtn = document.querySelector("#msg-btn");
const chatInput = document.querySelector(".chat-input");
const chatArea = document.querySelector(".chat-area");

msgBtn.addEventListener("click", () => {
  const msg = {
    input: chatInput.value,
    user: socket.id,
  };

  socket.emit("chat-msg", msg);
  chatInput.value = "";
});

chatInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const msg = {
      input: chatInput.value,
      user: socket.id,
      name: myProfile.name,
    };
    socket.emit("chat-msg", msg);
    chatInput.value = "";
  }
});

socket.on("chat-msg", (msg) => {
  const li = document.createElement("li");
  if (msg.user === socket.id) {
    li.classList.add("msg-sender");
  } else {
    li.classList.add("msg-receiver");
  }
  li.innerHTML = `<div>${msg.name}</div>
                  <div>${msg.input}</div>`;
  chatArea.appendChild(li);
  scrollBottom();
});

function scrollBottom() {
  const ul = document.querySelector(".chat-area");
  ul.scrollTop = ul.scrollHeight;
}
