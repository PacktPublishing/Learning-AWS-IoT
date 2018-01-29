var AWS = require('aws-sdk');
var AWSIoTData = require('aws-iot-device-sdk');
var AWSConfiguration = require('./aws-configuration.js');

console.log('Loaded AWS SDK for JavaScript and AWS IoT SDK for Node.js');

var currentlySubscribedTopic = 'iot/sensor';
var clientId = 'mqtt-explorer-' + (Math.floor((Math.random() * 100000) + 1));

// sensor data
var sensor_data = [];
var counter = 0;

AWS.config.region = AWSConfiguration.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
   IdentityPoolId: AWSConfiguration.poolId
});

const mqttClient = AWSIoTData.device({
   region: AWS.config.region,
   host:AWSConfiguration.host,
   clientId: clientId,
   protocol: 'wss',
   maximumReconnectTimeMs: 8000,
   debug: true,
   accessKeyId: '',
   secretKey: '',
   sessionToken: ''
});

var cognitoIdentity = new AWS.CognitoIdentity();
AWS.config.credentials.get(function(err, data) {
   if (!err) {
      console.log('retrieved identity: ' + AWS.config.credentials.identityId);
      var params = {
         IdentityId: AWS.config.credentials.identityId
      };
      cognitoIdentity.getCredentialsForIdentity(params, function(err, data) {
         if (!err) {
            mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
               data.Credentials.SecretKey,
               data.Credentials.SessionToken);
         } else {
            console.log('error retrieving credentials: ' + err);
            alert('error retrieving credentials: ' + err);
         }
      });
   } else {
      console.log('error retrieving identity:' + err);
      alert('error retrieving identity: ' + err);
   }
});

window.mqttClientConnectHandler = function() {
   console.log('connect');
   $("#status").text("Connected to AWS IoT.");

   mqttClient.subscribe(currentlySubscribedTopic);
};

window.mqttClientReconnectHandler = function() {
   console.log('reconnect');
   $("#status").text("Connected to AWS IoT.");
};

window.isUndefined = function(value) {
   return typeof value === 'undefined' || value === null;
};

window.mqttClientMessageHandler = function(topic, payload) {

   var obj = JSON.parse(payload.toString());

   sensor_data.push([counter, obj.temperature]);
   counter = counter + 1;
   if (sensor_data.length > 20)
       sensor_data.shift();

   $.plot($("#placeholder"), [sensor_data]);
   console.log('message: ' + topic + ':' + payload.toString());

};

window.updatePublishTopic = function() {};

mqttClient.on('connect', window.mqttClientConnectHandler);
mqttClient.on('reconnect', window.mqttClientReconnectHandler);
mqttClient.on('message', window.mqttClientMessageHandler);
