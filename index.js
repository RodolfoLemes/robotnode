var http = require('http').createServer(handler);
var static = require('node-static')
var io = require('socket.io')(http)

var file = new static.Server('./public')
const Motor = require('./src/Motor')
const Ultrassonic = require('./src/Ultrassonic')
const Functions = require('./src/Functions')

const encoderA = (require('./src/Encoder'))(io, 'A', 18)
const encoderB = (require('./src/Encoder'))(io, 'B', 17)

// Eccho-INPUT ----- Trigger-OUTPUT
const ultrassonicA = new Ultrassonic(5, 6).init()
const ultrassonicB = new Ultrassonic(19, 26).init()
//const ultrassonicC = new Ultrassonic(16, 20).init()
//const ultrassonicD = new Ultrassonic(21, 25).init()

setInterval(() => Functions.sendDistanceUltrassonicToSocket(io, ultrassonicA.getDistance(), 'A'), 0)
setInterval(() => Functions.sendDistanceUltrassonicToSocket(io, ultrassonicB.getDistance(), 'B'), 0)
//setInterval(() => Functions.sendDistanceUltrassonicToSocket(io, ultrassonicC.getDistance(), 'C'), 0)
//setInterval(() => Functions.sendDistanceUltrassonicToSocket(io, ultrassonicD.getDistance(), 'D'), 0)

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

            case 'pause':
                Motor.shutdown(true)
        }
    });

    socket.on('pwm', function(data) {
        console.log(data)
        Motor.regularPWM(data.motor, data.pwm)
    })
});

process.on('SIGINT', function () { //on ctrl+c
    Motor.shutdown(true)
    ultrassonicA.stop()
    ultrassonicB.stop()
    process.exit(); //exit completely
});

module.exports = io
