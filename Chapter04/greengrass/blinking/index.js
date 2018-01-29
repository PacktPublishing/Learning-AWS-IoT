const ggSdk = require('aws-greengrass-core-sdk');
var rpio = require('rpio');

const iotClient = new ggSdk.IotData();
const os = require('os');
const util = require('util');

function publishCallback(err, data) {
    console.log(err);
    console.log(data);
}

const myPlatform = util.format('%s-%s', os.platform(), os.release());
const state = rpio.HIGH;
const pubOpt = {
    topic: 'pi/blinking',
    payload: JSON.stringify({ message: util.format('Blinking! Sent from Greengrass Core running on platform: %s using NodeJS. LED=%d', myPlatform, state) }),
};

function greengrassBlinkingdRun() {
    rpio.open(12, rpio.OUTPUT, rpio.LOW);
    rpio.write(12, rpio.HIGH);    
    iotClient.publish(pubOpt, publishCallback);
    rpio.sleep(1);

    rpio.write(12, rpio.LOW);   
    state = rpio.LOW; 
    iotClient.publish(pubOpt, publishCallback);
    rpio.sleep(1);
    rpio.close(12);
}


setTimeout(greengrassBlinkingdRun, 2000);

exports.handler = function handler(event, context) {
    console.log(event);
    console.log(context);
};