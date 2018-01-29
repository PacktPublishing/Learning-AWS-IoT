var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
  keyPath: '<iot-thing>.private.key',
  certPath: '<iot-thing>.cert.pem',
    caPath: 'cert/root-CA.pem',
      host: '<iot-endpoint>.iot.<region>.amazonaws.com',
  clientId: 'user-testing',
    region: '<region>'
 });

device
   .on('connect', function() {
     console.log('connected');
     device.subscribe('sensorroom');     
   });
 
device
   .on('message', function(topic, payload) {
     console.log('recv:', topic, payload.toString());
});

console.log('Sensor subscriber started.');