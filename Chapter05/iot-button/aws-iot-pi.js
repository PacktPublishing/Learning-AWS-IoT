var awsIot = require('aws-iot-device-sdk');
var rpio = require('rpio');

var device = awsIot.device({
    keyPath: '<iot-thing>-private.pem.key',
   certPath: '<iot-thing>-certificate.pem.crt',
     caPath: 'root-ca-cert.pem',       
       host: '<iot-thing>.iot.<region>.amazonaws.com',       
   clientId: 'user-pi',
     region: '<region>'
 });

device
   .on('connect', function() {
     console.log('connected');
     device.subscribe('iotbutton/+');
     console.log('Waiting commmands..')
   });
 
device
   .on('message', function(topic, payload) {
     console.log('message', topic, payload.toString());
     
     var ret = JSON.parse(payload.toString());
     if(ret.clickType=='SINGLE'){
      console.log('SINGLE clicked --> TURN ON LED');      
      rpio.open(12, rpio.OUTPUT, rpio.LOW);
      rpio.write(12, rpio.HIGH);    
     }
     if(ret.clickType=='DOUBLE'){
      console.log('DOUBLE clicked --> TURN OFF LED');
      rpio.open(12, rpio.OUTPUT, rpio.LOW);
      rpio.write(12, rpio.LOW);  
     }     
});

// close GPIO while pressing CTRL+C
process.on('SIGINT', function() {
  rpio.close(12);
  process.exit();
});
