const socket = io();

const nameInput = document.getElementById("name-input");
const signUpBtn = document.getElementById("sign-up-btn");
let i = 0;
const avatars = [
  "demon.png",
  "minion.png",
  "old-man.png",
  "orange-woman.png",
  "pilot.png",
  "pirate.png",
];
 




signUpBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const url = avatars[i];
  

  const obj = {
    name,
    url,
    
  };

  localStorage.setItem("myProfile", JSON.stringify(obj));
  socket.emit("sign-up", obj);
  console.log(obj);
  location.href = "chat.html";
});

const rightBtn = document.querySelector("#avatar-right-arrow");
const leftBtn = document.querySelector("#avatar-left-arrow");
const avatarImg = document.querySelector("#avatar-img");

rightBtn.addEventListener("click", () => {
  i++;
  if (i > avatars.length - 1) {
    i = 0;
    avatarImg.src = avatars[i];
  } else {
    avatarImg.src = avatars[i];
  }
});

leftBtn.addEventListener("click", () => {
  i--;
  if (i < 0) {
    i = avatars.length - 1;
    avatarImg.src = avatars[i];
  } else {
    avatarImg.src = avatars[i];
  }
});
