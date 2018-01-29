var AWS = require('aws-sdk');
var fs = require('fs');

console.log('Demo AWS Rekognition.');
var accessKeyId = '<accessKeyId>';
const rekognition = new AWS.Rekognition({
    accessKeyId: accessKeyId,
    signatureVersion: 'v4',
    region: '<s3-region>'
});

var params = {
        Image: {
            S3Object: {
            Bucket: 'akurs3', 
            Name: 'IMG_2222.JPG'
          }
        }
    };
console.log('Analyzing...');
rekognition.detectLabels(params, function (err, data) {               
    if(err)
        console.log("Error in performing AWS Rekognition. Error: "+ err)
    else{
        console.log("Performing AWS Rekognition is success.");
        console.log('Result:');
        console.log(data);
    }    
        
});