const AWS = require('aws-sdk')
const Fs = require('fs')

var accessKeyId = '<accessKeyId>';
const Polly = new AWS.Polly({
    accessKeyId: accessKeyId,
    signatureVersion: 'v4',
    region: 'us-east-1'
});

let params = {
    'Text': 'Temperature is 40 celsius',
    'OutputFormat': 'mp3',
    'VoiceId': 'Kimberly'
}

Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err);
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            Fs.writeFile("./temperature.mp3", data.AudioStream, function(err) {
                if (err) {
                    return console.log(err)
                }
                console.log("temperature.mp3 file was saved!")
            })
        }
    }
});