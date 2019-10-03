let connect = () => {
  log("Connecting");
}

let shoot = () => {
  log("Shooting");
}

let reload = () => {
  log("Reloading");
}

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("connect").addEventListener("click", connect);
  document.getElementById("shoot").addEventListener("click", shoot);
  document.getElementById("reload").addEventListener("click", reload);
});
