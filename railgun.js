let device = undefined;

let connect = () => {
  log("Connecting to railgun ...");
  navigator.bluetooth.requestDevice({
    filters: [
      {services: ['battery_service']},
      { name: 'railgun' }
    ]
  })
  .then(dev => {
    device = dev;
    log('Connecting to GATT Server ...');
    return device.gatt.connect();
  })
  .then(server => {
    log('Connected to GATT server');
  })
  .catch(error => {
    log('ERROR ' + error);
  });
}

let shoot = () => {
  log("Shooting");
}

let reload = () => {
  log("Reloading");
}

let disconnect = () => {
  if (device) {
    log("Disconnecting ...");
    device.gatt.disconnect();
    device = undefined;
    log("Successfully disconnected from railgun");
  } else {
    log("Not connected to a railgun");
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("connect").addEventListener("click", connect);
  document.getElementById("shoot").addEventListener("click", shoot);
  document.getElementById("reload").addEventListener("click", reload);
  document.getElementById("disconnect").addEventListener("click", disconnect);
});
