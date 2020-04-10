var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http)

const motor = require('./MotorControll')

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

io.sockets.on('connection', function (socket) { // Web Socket Connection
    socket.on('motor', function (data) { //get light switch status from client
        console.log(data)
        switch(data.direction) {
            case 'up':
                motor.forward()
                break

            case 'left':
                motor.turn(false)
                break

            case 'down':
                motor.backward()
                break

            case 'right':
                motor.turn(true)
                break
        }
    });

    socket.on('pwm', function(data) {
        console.log(data)
        motor.regularPWM(data.motor, data.pwm)
    })
});

process.on('SIGINT', function () { //on ctrl+c
    motor.shutdown(true)
    process.exit(); //exit completely
});