const AWS = require('aws-sdk')
const Stream = require('stream')
const Speaker = require('speaker')

var accessKeyId = '<accessKeyId>';
const Polly = new AWS.Polly({
    accessKeyId: accessKeyId,
    signatureVersion: 'v4',
    region: 'us-east-1'
});

const Player = new Speaker({
  channels: 1,
  bitDepth: 16,
  sampleRate: 16000
});

let params = {
    'OutputFormat': 'pcm',
    'Text': 'Temperature is 40 celsius',
    'OutputFormat': 'mp3',
    'VoiceId': 'Kimberly'
}

Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {        
        console.log(err);
    } else if (data) {        
        if (data.AudioStream instanceof Buffer) {
            
            var bufferStream = new Stream.PassThrough();            
            bufferStream.end(data.AudioStream);   
            console.log(bufferStream);         
            bufferStream.pipe(Player);
            
        }else{
            console.log('data is not AudioStream');
        }
    }
});