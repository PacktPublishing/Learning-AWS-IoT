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
     device.subscribe('alexa/led');     
   });
 
device
   .on('message', function(topic, payload) {
       var order = payload.toString();
       if(order=='on'){
           console.log('turn on LED');
           // perform turn on LED
           //
       }else{
           console.log('turn off LED');
           // perform turn off LED
           //           
       }     
});

console.log('AWS IoT - Alexa program started.');