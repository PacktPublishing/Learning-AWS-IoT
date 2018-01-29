var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
 
    var params = {
        TableName: 'aws-iot-button-db',
        Item: {
            'msg-id': {S:new Date().getTime().toString()},
            'CLICKED' : {S:event.clickType},
            'BUTTON_ID' : {S:event.serialNumber},
        }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
        if (err) {
            callback(err, 'Error');
        } else {
            callback(null, 'Success');
        }
    });
};