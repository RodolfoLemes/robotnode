var http = require('http').createServer(handler);
var static = require('node-static')
var io = require('socket.io')(http)

var file = new static.Server('./public')
const Motor = require('./src/Motor')
const Encoder = require('./src/Encoder')
const Ultrassonic = require('./src/Ultrassonic')
const Functions = require('./src/Functions')

const encoderA = new Encoder('A', 17)
const encoderB = new Encoder('B', 18)

// Eccho-INPUT ----- Trigger-OUTPUT
//const ultrassonicA = new Ultrassonic(5, 6).init()
//const ultrassonicB = new Ultrassonic(19, 26).init()
//const ultrassonicC = new Ultrassonic(16, 20).init()
//const ultrassonicD = new Ultrassonic(21, 25).init()

//setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicA.getDistance(), 'A'), 0)
//setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicB.getDistance(), 'B'), 0)
//setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicC.getDistance(), 'C'), 0)
//setInterval(() => Functions.sendDistanceUltrassonicToSocket(ultrassonicD.getDistance(), 'D'), 0)

http.listen(8080); //listen to port 8080

function handler(req, res) { //what to do on requests to port 8080
    file.serve(req, res);
}

io.on('connection', function (socket) {
    socket.on('motor', function (data) { 
        console.log(data)
        switch(data.direction) {
            case 'up':
                Motor.forward()
                break

            case 'left':
                Motor.turn(false)
                break

            case 'down':
                Motor.backward()
                break

            case 'right':
                Motor.turn(true)
                break
        }
    });

    socket.on('pwm', function(data) {
        console.log(data)
        Motor.regularPWM(data.motor, data.pwm)
    })
});
process.on('SIGINT', function () { //on ctrl+c
    Motor.shutdown(true)
    process.exit(); //exit completely
});

module.exports = io
