const io = require('../index')

// Receive data from client
io.sockets.on('connection', function (socket) { // Web Socket Connection
    socket.on('motor', function (data) { //get light switch status from client
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