var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    var dataPusher = setInterval(function () {
        socket.broadcast.emit('data', Math.random() * 100);
    }, 1000);


    socket.on('disconnect', function() {
        console.log('closing');

    });


});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

