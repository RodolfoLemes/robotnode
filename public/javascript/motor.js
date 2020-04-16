var up = document.getElementById("up")
var left = document.getElementById("left")
var down = document.getElementById("down")
var right = document.getElementById("right")
var buttonPause = document.getElementById("stop")
var sliderA = document.getElementById('sliderInputA')
var sliderB = document.getElementById('sliderInputB')


document.addEventListener ('keypress', (event) => {
    const keyName = event.key;
    switch(keyName) {
        case 'w':
            socket.emit('motor', { direction: 'up' })
            break
        case 'a':
            socket.emit('motor', { direction: 'left' })
            break
        case 's':
            socket.emit('motor', { direction: 'down' })
            break
        case 'd':
            socket.emit('motor', { direction: 'right' })
            break
    }
})

up.addEventListener('click', function() {
    socket.emit('motor', { direction: 'up' })
})    
left.addEventListener('click', function() {
    socket.emit('motor', { direction: 'left' })
})    
down.addEventListener('click', function() {
    socket.emit('motor', { direction: 'down' })
})    
right.addEventListener('click', function() {
    socket.emit('motor', { direction: 'right' })
})
sliderA.addEventListener('change', function() {
    var pwm = parseInt(this.value)
    socket.emit('pwm', { pwm, motor: 'A' })
})
sliderB.addEventListener('change', function() {
    var pwm = parseInt(this.value)
    socket.emit('pwm', { pwm, motor: 'B' })
})
buttonPause.addEventListener('click', function() {
    socket.emit('motor', { direction: 'pause' })
})