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
     device.subscribe('test/hello');
     device.publish('test/hello', JSON.stringify({ test_data: 1}));
   });
 
device
   .on('message', function(topic, payload) {
     console.log('message', topic, payload.toString());
});