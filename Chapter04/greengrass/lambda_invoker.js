var AWS = require('aws-sdk');
AWS.config.update({region:'ap-northeast-1'});

var accessKeyId = '<accessKeyId>'
var secretAccessKey = '<secretAccessKey>';
AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});

var lambda = new AWS.Lambda();
var params = {
  FunctionName: 'arn:aws:lambda:<region>:<accountId>:function:blinking',
  Payload: '{"msg": "this is testing"}'
};
lambda.invoke(params, function(err, data) {
  if (err) console.log(err, err.stack); 
  else     console.log(data);           
});