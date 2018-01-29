var AWS = require('aws-sdk');
var fs = require('fs');

console.log('Demo uploading a file to Amazon S3.');
var accessKeyId = '<accessKeyId>';
const s3bucket = new AWS.S3({
    accessKeyId: accessKeyId,
    signatureVersion: 'v4',
    region: 'us-east-1'
});


var filepath ='./IMG_2222.JPG';
var filename = 'IMG_2222.JPG';
console.log('Uploading ',filename, ' to Amazon S3.');
console.log(filename);
var params = {
    Key: filename,
    Body: fs.createReadStream(filepath),
    Bucket: '<s3-bucket>'
};
console.log('uploading...');
s3bucket.upload(params, function (err, res) {               
    if(err)
        console.log("Error in uploading file on s3. Error: "+ err)
    else    
        console.log("File successfully uploaded.")
});