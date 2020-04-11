var http = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io')(http)

const Motor = require('./src/Motor')
const Encoder = require('./src/Encoder')
const Ultrassonic = require('./src/Ultrassonic')
const Functions = require('./src/Functions')

const encoderA = new Encoder('A', 17)
const encoderB = new Encoder('B', 18)

// Eccho-INPUT ----- Trigger-OUTPUT
const ultrassonicA = new Ultrassonic(5, 6).init()
const ultrassonicB = new Ultrassonic(19, 26).init()
const ultrassonicC = new Ultrassonic(16, 20).init()
const ultrassonicD = new Ultrassonic(21, 25).init()

setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicA.getDistance(), 'A'), 0)
setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicB.getDistance(), 'B'), 0)
setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicC.getDistance(), 'C'), 0)
setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicD.getDistance(), 'D'), 0)

http.listen(8080); //listen to port 8080

function handler(req, res) { //what to do on requests to port 8080
    fs.readFile(__dirname + '/public/index.html', function (err, data) { //read file rgb.html in public folder
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            }); //display 404 on error
            return res.end("404 Not Found");
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        }); //write HTML
        res.write(data); //write data from rgb.html
        return res.end();
    });
}

process.on('SIGINT', function () { //on ctrl+c
    Motor.shutdown(true)
    process.exit(); //exit completely
});

module.exports = io