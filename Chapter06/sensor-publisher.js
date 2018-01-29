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
  console.log('connected to AWS IoT.');  
  
  setInterval(function(){
    // random 10 - 35
    var data = {
      'temperature': Math.floor((Math.random() * 35) + 10)
    };    
    device.publish('iot/sensor', JSON.stringify(data));
    console.log('sent: ', JSON.stringify(data));
  }, 3000);
});

console.log('Sensor publisher started.');