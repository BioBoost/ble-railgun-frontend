let device = undefined;

let connect = () => {
  log("Connecting to railgun ...");
  navigator.bluetooth.requestDevice({
    filters: [
      {services: [
          // All accessible services need to be added
          'battery_service',
          'eac9cf2d-1d6e-4ab5-8582-bdc124b15e52'
        ]
      },
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
    subscribeToBatteryNotifications();
  })
  .catch(error => {
    log('ERROR ' + error);
  });
}

let subscribeToBatteryNotifications = () => {
  if (device) {
    log('Getting Battery Level Service ...');
    device.gatt.getPrimaryService('battery_service')
    .then(service => {
      log('Getting Battery Level Characteristic ...');
      return service.getCharacteristic('battery_level');
    })
    .then(characteristic => {
      return characteristic.startNotifications().then(_ => {
        log('Subscribed to battery level notifications');
        characteristic.addEventListener('characteristicvaluechanged', handleBatteryLevelNotification);
      });
    })
    .catch(error => {
      log('ERROR ' + error);
    });
  }
}

let handleBatteryLevelNotification = (event) => {
  let value = event.target.value;
  log('Batterylevel: ' + value.getUint8(0));
}

let shoot = () => {
  log("Shooting");
}

let reload = () => {
  if (device) {
    log("Reloading railgun ...");
    log("Getting RailgunCommand Service ...");
    device.gatt.getPrimaryService('eac9cf2d-1d6e-4ab5-8582-bdc124b15e52')
    .then(service => {
      log('Getting Charge Characteristic ...');
      return service.getCharacteristic('b65a60ce-b0e9-43a3-a991-4a908a5705bc');
    })
    .then(characteristic => {
      log('Writing Charge Characteristic ...');

      // Writing 1 is the signal to reset energy expended.
      let chargePercentage = Uint8Array.of(50);
      return characteristic.writeValue(chargePercentage);
    })
    .then(_ => {
      log('Railgun successfully recharged');
    })
    .catch(error => {
      log('ERROR ' + error);
    });

  } else {
    log("Not connected to a railgun");
  }
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
